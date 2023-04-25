import { uploadImg } from "@/api/ic";
import { getAllCrt } from "@/api/ic/crteam";
import { CrTeam } from "@/entity/IC/CrTeam";
import {
	generateSelect,
	gjMap,
	hjlxMap,
	hyzkMap,
	jyjxqkMap,
	jzlbMap,
	mzMap,
	whcdMap,
	xbMap,
	zzmmMap,
} from "@/utils";
import { GMessage } from "@/utils/msg/GMsg";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	message,
} from "antd";
import Upload, {
	RcFile,
	UploadFile,
	UploadProps,
} from "antd/es/upload";
import "react";
import { useState } from "react";

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

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

export function RegisterForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	gMsg: GMessage;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, gMsg, disabled } = props;

	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([
		// {
		// 	uid: "-1",
		// 	name: "image.png",
		// 	status: "done",
		// 	url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
		// },
		// {
		// 	uid: "-xxx",
		// 	percent: 50,
		// 	name: "image.png",
		// 	status: "uploading",
		// 	url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
		// },
		// {
		// 	uid: "-5",
		// 	name: "image.png",
		// 	status: "error",
		// },
	]);

	const [team, setTeam] = useState<any[]>();

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(
				file.originFileObj as RcFile
			);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name ||
				file.url!.substring(file.url!.lastIndexOf("/") + 1)
		);
	};

	const handleChange: UploadProps["onChange"] = ({
		fileList: newFileList,
	}) => setFileList(newFileList);

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	useRequest(getAllCrt, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				const teamList = data.data;
				const temp = teamList.map((team: CrTeam) => {
					return {
						code: team.id,
						value: team.teamName,
					};
				});
				setTeam(temp);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		refreshDeps: [form],
	});

	const { run: runUploadImg } = useRequest(
		(img) => uploadImg(img),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					gMsg.onSuccess("上传成功!");
					setImageUrl(data.data);
				} else {
					gMsg.onError("上传失败!" + data.message);
				}
			},
			onError: (error: any) => {
				gMsg.onError(error);
			},
			manual: true,
		}
	);

	const customRequest = (options: any) => {
		console.log("aaa");
		const { file, filename, onProgress, onSuccess } = options;
		const imgItem = {
			uid: file.uid,
			name: file.name,
			status: "uploading",
			url: "",
			percent: 99,
		} as UploadFile;
		setFileList([imgItem]);

		console.log(file, filename);
		runUploadImg(file);
		const afterImgItem = {
			uid: file.uid,
			name: file.name,
			status: "done",
			url: "https://ccorr-bucket.oss-cn-shenzhen.aliyuncs.com/ccorr/images/20230425/106453304_p0.jpg",
			percent: 100,
		} as UploadFile;

		console.log(afterImgItem);
		setFileList([afterImgItem]);
	};

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"zp"} label="照片">
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					fileList={fileList}
					customRequest={customRequest}
					onPreview={handlePreview}
					onChange={handleChange}>
					{fileList.length == 1 ? null : uploadButton}
				</Upload>
				<Modal
					open={previewOpen}
					title={previewTitle}
					footer={null}
					onCancel={handleCancel}>
					<img
						alt="example"
						style={{ width: "100%" }}
						src={previewImage}
					/>
				</Modal>
			</Form.Item>
			<Form.Item
				name={"dxbh"}
				label={"社区矫正对象编号"}
				rules={[
					{
						required: true,
						message: "请输入对象编号",
					},
				]}>
				<Input
					placeholder={"请输入社区矫正对象编号"}
					disabled={disabled}
				/>
			</Form.Item>
			<Form.Item
				name={"sfdcpg"}
				label="是否调查评估"
				rules={[
					{
						required: true,
					},
				]}>
				<Select style={{ width: 120 }}>
					<Select.Option value="0">否</Select.Option>
					<Select.Option value="1">是</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item
				name={"jzlb"}
				label="矫正类别"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(jzlbMap)}
			</Form.Item>
			<Form.Item name={"team"} label="确定矫正小组">
				{generateSelect(team)}
			</Form.Item>
			<Form.Item
				name={"xm"}
				label="姓名"
				rules={[
					{
						required: true,
						message: "请输入对象姓名",
					},
				]}>
				<Input placeholder={"请输入姓名"} />
			</Form.Item>
			<Form.Item
				name={"xb"}
				label="性别"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(xbMap)}
			</Form.Item>
			<Form.Item
				name={"mz"}
				label="民族"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(mzMap)}
			</Form.Item>
			<Form.Item
				name={"gj"}
				label="国籍"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(gjMap)}
			</Form.Item>
			<Form.Item
				name={"hjlx"}
				label="户籍类型"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(hjlxMap)}
			</Form.Item>
			<Form.Item
				name={"sfzhm"}
				label="身份证号码"
				rules={[
					{
						required: true,
						message: "请输入对象的身份证号码",
					},
				]}>
				<Input
					placeholder={"请输入身份证号码"}
					maxLength={19}
				/>
			</Form.Item>
			<Form.Item
				name={"csrq"}
				label="出生日期"
				rules={[
					{
						required: true,
					},
				]}>
				<DatePicker />
			</Form.Item>
			<Form.Item
				name={"whcd"}
				label="文化程度"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(whcdMap)}
			</Form.Item>
			<Form.Item
				name={"hyzk"}
				label="婚姻状况"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(hyzkMap)}
			</Form.Item>
			<Form.Item
				name={"jyjxqk"}
				label="就业就学情况"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(jyjxqkMap)}
			</Form.Item>
			<Form.Item
				name={"xzzmm"}
				label="政治面貌"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(zzmmMap)}
			</Form.Item>
			<Form.Item name={"xgzdw"} label="现工作单位">
				<Input placeholder="请输入现工作单位" />
			</Form.Item>
			<Form.Item name={"dwlxdh"} label="单位联系电话">
				<Input placeholder="请输入单位联系电话" />
			</Form.Item>
			<Form.Item
				name={"grlxdh"}
				label="个人联系电话"
				rules={[
					{
						required: true,
						message: "请输入个人的联系电话",
					},
				]}>
				<Input placeholder="请输入个人联系电话" />
			</Form.Item>
			<Form.Item
				name={"ywjtcyjzyshgx"}
				label="有无家庭成员及主要社会关系">
				<Select style={{ width: 120 }}>
					<Select.Option value="0">否</Select.Option>
					<Select.Option value="1">是</Select.Option>
				</Select>
			</Form.Item>
		</Form>
	);
}
