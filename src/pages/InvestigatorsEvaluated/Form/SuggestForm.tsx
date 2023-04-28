// 调查评估意见书
import { download, downloadTemplate, uploadDocx } from "@/api/ie";
import TemplateForm from "@/template/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
	Button,
	Input,
	Space,
	UploadFile,
	UploadProps,
	message,
} from "antd";
import { Upload } from "antd/lib";
import { useState } from "react";

/**
 * 调查评估意见书
 */
export function SuggestForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;

	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const { run: runUploadDocx } = useRequest(
		(docx) => uploadDocx(docx),
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

	const { run: runDownloadTemplate } = useRequest(
		() => downloadTemplate(),
		{
			onSuccess: ({ data }) => {
				message.success("下载成功!");
				download(data, initialValues.wtbh + "模板.doc");
			},
			manual: true,
			debounceWait: 500,
		}
	);
	const { run: runDownloadDocx } = useRequest(
		(name) => downloadTemplate(name),
		{
			onSuccess: ({ data }) => {
				message.success("下载成功!");
				download(data, initialValues.wtbh + ".doc");
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

		runUploadDocx(file);
	};

	return (
		<>
			<TemplateForm
				disabled={disabled}
				form={form}
				onFinish={(values: any) => {
					if (fileList.length > 0) {
						onFinish(values);
					}
				}}
				initialValues={initialValues}
				formTable={[
					{
						name: "wtbh",
						label: "委托编号",
						component: <Input disabled />,
					},
					{
						name: "dcyjshr",
						label: "调查评估意见审核人",
						component: <Input disabled={disabled} />,
					},
					{
						label: "调查评估意见书",
						component: (
							<Space>
								<Button
									type="link"
									onClick={runDownloadTemplate}>
									模板下载
								</Button>

								<Upload
									{...uploadProps}
									customRequest={customRequest}>
									<Button icon={<UploadOutlined />}>
										上传意见书
									</Button>
								</Upload>
								{initialValues.yjs && (
									<Button
										type="link"
										onClick={() =>
											runDownloadDocx(
												initialValues.yjs
											)
										}>
										下载意见书
									</Button>
								)}
							</Space>
						),
					},
				]}
			/>
		</>
	);
}
