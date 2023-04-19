import { generateSelect, sfcnMap } from "@/utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import Upload, {
	RcFile,
	UploadChangeParam,
	UploadFile,
	UploadProps,
} from "antd/es/upload";
import "react";
import { useState } from "react";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () =>
		callback(reader.result as string)
	);
	reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng =
		file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

export function AddTeamForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
}) {
	const { form, onFinish, initialValues } = props;
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();

	const handleChange: UploadProps["onChange"] = (
		info: UploadChangeParam<UploadFile>
	) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as RcFile, (url) => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};
	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"dxbh"} label={"社区矫正对象编号"}>
				<Input placeholder={"请输入社区矫正对象编号"} />
			</Form.Item>
			<Form.Item name={"famc"} label={"方案名称"}>
				<Input placeholder={"请输入方案名称"} />
			</Form.Item>
			<Form.Item name={"sfcn"} label="是否成年">
				{generateSelect(sfcnMap)}
			</Form.Item>
			<Form.Item name={"jdglcs"} label="监督管理措施">
				<Input.TextArea placeholder={"请输入监督管理措施"} />
			</Form.Item>
			<Form.Item name={"jyjzcs"} label="教育矫正措施">
				<Input.TextArea placeholder={"请输入教育矫正措施"} />
			</Form.Item>
			<Form.Item name={"bkfzcs"} label="帮困扶助措施">
				<Input.TextArea placeholder={"请输入帮困扶助措施"} />
			</Form.Item>
			<Form.Item name={"qtcs"} label="其他措施">
				<Input.TextArea placeholder={"请输入其他措施"} />
			</Form.Item>
			<Form.Item name={"plan"} label="矫正方案上传">
				<Form.Item>
					<Upload
						name="avatar"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action=""
						beforeUpload={beforeUpload}
						onChange={handleChange}>
						{imageUrl ? (
							<img
								src={imageUrl}
								alt="avatar"
								style={{ width: "100%" }}
							/>
						) : (
							uploadButton
						)}
					</Upload>
				</Form.Item>
			</Form.Item>
		</Form>
	);
}
