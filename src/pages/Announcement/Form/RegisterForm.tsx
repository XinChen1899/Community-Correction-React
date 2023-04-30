import { downloadAudio, uploadAudio } from "@/api/ic/announce";
import TemplateForm from "@/template/Form";
import { download } from "@/utils/download";
import { UploadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
	Button,
	DatePicker,
	Input,
	Space,
	Upload,
	UploadFile,
	UploadProps,
	message,
} from "antd";
import "react";
import { useState } from "react";

export default function RegisterForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;

	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const { run: runUploadAudio } = useRequest(
		(docx) => uploadAudio(docx),
		{
			onSuccess: ({ data }) => {
				console.log(data);
				if (data.status == "200") {
					const url = data.data.split("/");
					const name = url[url.length - 1];
					//setImageUrl(data.data);
					const after = {
						uid: "123",
						name,
						status: "done",
						url: data.data,
						percent: 100,
					} as UploadFile;
					form.setFieldValue("zz", data.data);
					console.log(after);
					setFileList([after]);
				} else {
					message.error("上传失败!" + data.message);
				}
			},
			onError: (error: any) => {
				message.error(error);
			},
			manual: true,
		}
	);

	const uploadProps: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		fileList,
	};
	const { run: runDownloadAudio } = useRequest(
		(name) => downloadAudio(name),
		{
			onSuccess: ({ data }) => {
				message.success("下载成功!");
				download(data, initialValues.audio + ".mp3");
			},
			manual: true,
			debounceWait: 500,
		}
	);

	const customRequest = (options: any) => {
		const { file } = options;
		const imgItem = {
			uid: file.uid,
			name: file.name,
			status: "uploading",
			url: "",
			percent: 99,
		} as UploadFile;
		setFileList([imgItem]);
		console.log(file);

		runUploadAudio(file);
	};

	return (
		<TemplateForm
			disabled={disabled}
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}
			formTable={[
				{
					name: "dxbh",
					label: "社区矫正对象编号",
					component: (
						<Input
							placeholder="请输入对象编号"
							disabled={disabled}
						/>
					),
				},
				{
					name: "xgrq",
					label: "宣告日期",
					component: <DatePicker />,
				},
				{
					name: "audio",
					label: "宣告音频",
					component: (
						<Space>
							<Upload
								accept="audio/ogg,audio/mpeg,audio/wav,audio/m4a,audio/flac"
								{...uploadProps}
								customRequest={customRequest}>
								<Button icon={<UploadOutlined />}>
									上传宣告音频
								</Button>
							</Upload>
							{initialValues.audio && (
								<Button
									type="link"
									onClick={() =>
										runDownloadAudio(
											initialValues.audio
										)
									}>
									下载宣告音频
								</Button>
							)}
						</Space>
					),
				},
			]}
		/>
	);
}
