import "react";
import { DatePicker, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
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
} from "@/utils";
import Upload, {
	RcFile,
	UploadChangeParam,
	UploadFile,
	UploadProps,
} from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { CrTeam } from "@/entity/IC/CrTeam";
import { getAllCrt } from "@/api/ic/crteam";
import { useRequest } from "ahooks";
import { GMessage } from "@/utils/msg/GMsg";

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

export function RegisterForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	gMsg: GMessage;
}) {
	const { form, onFinish, initialValues, gMsg } = props;
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();
	const [team, setTeam] = useState<any[]>();

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

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"dxbh"} label={"社区矫正对象编号"}>
				<Input placeholder={"请输入社区矫正对象编号"} />
			</Form.Item>
			<Form.Item name={"sfdcpg"} label="是否调查评估">
				<Select style={{ width: 120 }}>
					<Select.Option value="0">否</Select.Option>
					<Select.Option value="1">是</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name={"jzlb"} label="矫正类别">
				{generateSelect(jzlbMap)}
			</Form.Item>
			<Form.Item name={"team"} label="确定矫正小组">
				{generateSelect(team)}
			</Form.Item>
			<Form.Item name={"xm"} label="姓名">
				<Input placeholder={"请输入姓名"} />
			</Form.Item>
			<Form.Item name={"xb"} label="性别">
				{generateSelect(xbMap)}
			</Form.Item>
			<Form.Item name={"mz"} label="民族">
				{generateSelect(mzMap)}
			</Form.Item>
			<Form.Item name={"gj"} label="国籍">
				{generateSelect(gjMap)}
			</Form.Item>
			<Form.Item name={"hjlx"} label="户籍类型">
				{generateSelect(hjlxMap)}
			</Form.Item>
			<Form.Item name={"sfzhm"} label="身份证号码">
				<Input
					placeholder={"请输入身份证号码"}
					maxLength={19}
				/>
			</Form.Item>
			<Form.Item name={"csrq"} label="出生日期">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"whcd"} label="文化程度">
				{generateSelect(whcdMap)}
			</Form.Item>
			<Form.Item name={"hyzk"} label="婚姻状况">
				{generateSelect(hyzkMap)}
			</Form.Item>
			<Form.Item name={"jyjxqk"} label="就业就学情况">
				{generateSelect(jyjxqkMap)}
			</Form.Item>
			<Form.Item name={"xzzmm"} label="原现政治面貌">
				<Input placeholder="请输入政治面貌" />
			</Form.Item>
			<Form.Item name={"xgzdw"} label="现工作单位">
				<Input placeholder="请输入现工作单位" />
			</Form.Item>
			<Form.Item name={"dwlxdh"} label="单位联系电话">
				<Input placeholder="请输入单位联系电话" />
			</Form.Item>
			<Form.Item name={"grlxdh"} label="个人联系电话">
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
			<Form.Item name={"zp"} label="照片">
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
