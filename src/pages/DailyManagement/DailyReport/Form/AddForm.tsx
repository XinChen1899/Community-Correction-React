import { uploadDocx } from "@/api/daily/report";
import TemplateForm from "@/template/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
	Button,
	DatePicker,
	Input,
	Upload,
	UploadFile,
	UploadProps,
	message,
} from "antd";
import "react";
import { useState } from "react";

export default function AddForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const uploadProps: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		fileList,
	};

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
		<TemplateForm
			disabled={disabled}
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}
			formTable={[
				{
					name: "dxbh",
					label: "社区矫正对象编号",
					component: <Input />,
				},
				{
					name: "bg",
					label: "报告文档上传",
					component: (
						<Upload
							{...uploadProps}
							customRequest={customRequest}>
							<Button icon={<UploadOutlined />}>
								上传矫正方案
							</Button>
						</Upload>
					),
				},
				{
					name: "date",
					label: "提交日期",
					component: (
						<DatePicker format="YYYY-MM-DD HH:mm:ss" />
					),
				},
			]}
		/>
	);
}
