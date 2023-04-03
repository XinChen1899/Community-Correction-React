import { Button, Card, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import { IEInfo } from "@/entity/IE/IEInfo";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";
import { Space } from "antd/lib";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { IEInfo2 } from "@/entity/IE/IEInfo2";
import dayjs from "dayjs";
import { getDate, saveData, updateData } from "@/api/ie";

const { TextArea } = Input;

interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	taskUpdate: any;
	setTaskUpdate: any;
}

export default function TaskModifyModal(props: ITaskInfoModal) {
	const { open, setOpen, selectTask, setTableUpdate, tableUpdate, taskUpdate, setTaskUpdate } = props;

	const wtbh = selectTask.wtbh;
	const tempIeInfo: IEInfo2 = {
		bdcpgrdlx: "",
		bgrcsrq: dayjs(),
		bgrgzdw: "",
		bgrjzddz: "",
		bgrsfzh: "",
		bgrxb: "",
		dcdwxqj: "",
		dcpgyj: "",
		dcpgyjs: "",
		dcyjshr: "",
		fjx: "",
		nsyjzlb: "",
		pjjg: "",
		pjrq: dayjs(),
		wtdch: "",
		wtdw: "",
		ypxf: "",
		ypxq: "",
		ypxqjsrq: dayjs(),
		ypxqksrq: dayjs(),
		zm: "",

		wtbh: selectTask.wtbh,
		bgrxm: selectTask.name
	};
	const [ieInfo, setIeInfo] = useState<IEInfo2>(tempIeInfo);
	const [confirmLoading, setConfirmLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`http://localhost:9006/ie/${wtbh}`);
			const temp: IEInfo = result.data;
			const data: IEInfo2 = result.data;
			data.bgrcsrq = dayjs(temp.bgrcsrq);
			data.ypxqjsrq = dayjs(temp.ypxqjsrq);
			data.ypxqksrq = dayjs(temp.ypxqksrq);
			data.pjrq = dayjs(temp.pjrq);
			setIeInfo(data);
		};
		fetchData();
		console.log("Modify: Get IEInfo");
		console.log(ieInfo);
	}, [wtbh, taskUpdate]);

	// todo 根据WTBH获取IEInfo 和IEVisitInfo

	const ieVisitInfo: IEVisitInfo = {
		bdcrxm: selectTask.name,
		dcdd: "",
		dcdwsfs: "",
		dcr: "谢毓佺",
		dcsj: "",
		dcsx: "",
		wtbh: selectTask.wtbh,
		ybgrgx: ""
	};

	const [form] = Form.useForm();
	const [form2] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(ieInfo);
		form2.resetFields();
		form2.setFieldsValue(ieVisitInfo);
	});

	const onFinish = async (values: any) => {
		const info = values as IEInfo;

		info.pjrq = getDate(values.pjrq);
		info.ypxqjsrq = getDate(values.ypxqjsrq);
		info.bgrcsrq = getDate(values.bgrcsrq);
		info.ypxqksrq = getDate(values.ypxqksrq);
		await updateData(info);
		setTableUpdate(!tableUpdate);
		setTaskUpdate(!taskUpdate);
	};

	const handleOk = () => {
		form.submit();
		form2.submit();
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 1000);
	};
	// 点击对话框的取消按钮
	const handleCancel = () => {
		setOpen(false);
	};


	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectTask.name + "的调查评估信息"}
			onOk={handleOk}
			onCancel={handleCancel}
			confirmLoading={confirmLoading}
			// footer={[
			// 	<Button key="back" onClick={handleCancel}>
			// 		返回
			// 	</Button>,
			// 	<Button type={"primary"} onClick={handleOk}>
			// 		更新
			// 	</Button>
			// ]}
		>
			<Space direction={"vertical"}>
				<Card title={"调查评估信息表"} style={{ width: "900px" }}>
					<Form form={form}
						  onFinish={onFinish}
						  initialValues={ieInfo}
					>
						<Form.Item name={"wtbh"} label={"委托编号"}>
							<Input disabled={true} />
						</Form.Item>
						<Form.Item name={"wtdw"} label="委托单位">
							<Input placeholder={"请输入委托单位"} />
						</Form.Item>
						<Form.Item name={"wtdch"} label="委托调查函">
							<TextArea placeholder={"请输入委托调查函"} />
						</Form.Item>
						<Form.Item name={"bdcpgrdlx"} label="被调查评估对象的类型" initialValue={"01"}>
							<Select defaultValue="被告人" style={{ width: 120 }}>
								<Select.Option value="01">被告人</Select.Option>
								<Select.Option value="02">罪犯</Select.Option>
								<Select.Option value="99">其他</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name={"bgrxm"} label="被调查评估对象姓名">
							<Input placeholder={"请输入姓名"} />
						</Form.Item>
						<Form.Item name={"bgrxb"} label="被调查评估对象性别" initialValue={"male"}>
							<Select defaultValue="男" style={{ width: 120 }}>
								<Select.Option value="male">男</Select.Option>
								<Select.Option value="female">女</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name={"bgrsfzh"} label="被调查评估对象的身份证号">
							<Input placeholder={"请输入身份证"} />
						</Form.Item>
						<Form.Item name={"bgrcsrq"} label="被调查评估对象出生日期">
							<DatePicker />
						</Form.Item>
						<Form.Item name={"bgrjzddz"} label="被调查评估对象居住地地址">
							<Input placeholder={"请输入居住地址"} />
						</Form.Item>
						<Form.Item name={"bgrgzdw"} label="被调查评估对象工作单位">
							<Input placeholder={"请输入工作单位"} />
						</Form.Item>
						<Form.Item name={"zm"} label="罪名" initialValue={"01"}>
							<Select defaultValue="危害国家安全" style={{ width: 230 }}>
								<Select.Option value="01">危害国家安全</Select.Option>
								<Select.Option value="02">危害公共安全</Select.Option>
								<Select.Option value="03">破坏社会主义市场经济秩序</Select.Option>
								<Select.Option value="04">侵犯公民人身权利、民主权利</Select.Option>
								<Select.Option value="05">侵犯财产</Select.Option>
								<Select.Option value="06">妨害社会管理秩序</Select.Option>
								<Select.Option value="07">危害国防利益</Select.Option>
								<Select.Option value="08">贪污受贿</Select.Option>
								<Select.Option value="09">渎职</Select.Option>
								<Select.Option value="99">其他</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name={"ypxq"} label="原判刑期">
							<Input placeholder={"请输入原判刑期"} />
						</Form.Item>
						<Form.Item name={"ypxqksrq"} label="原判刑期开始日期">
							<DatePicker />
						</Form.Item>
						<Form.Item name={"ypxqjsrq"} label="原判刑期结束日期">
							<DatePicker />
						</Form.Item>
						<Form.Item name={"ypxf"} label="原判刑罚" initialValue={"01"}>
							<Select defaultValue="死刑缓期两年执行" style={{ width: 170 }}>
								<Select.Option value="01">死刑缓期两年执行</Select.Option>
								<Select.Option value="02">无期徒刑</Select.Option>
								<Select.Option value="03">有期徒刑</Select.Option>
								<Select.Option value="04">拘役</Select.Option>
								<Select.Option value="05">管制</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name={"fjx"} label="附加刑" initialValue={"99"}>
							<Select defaultValue="无" style={{ width: 170 }}>
								<Select.Option value="01">罚金</Select.Option>
								<Select.Option value="02">剥夺政治权利</Select.Option>
								<Select.Option value="03">没收财产</Select.Option>
								<Select.Option value="04">驱逐出境</Select.Option>
								<Select.Option value="05">无</Select.Option>
								<Select.Option value="99">其他</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name={"pjjg"} label="判决机关" initialValue={"01"}>
							<Select defaultValue="人民法院" style={{ width: 170 }}>
								<Select.Option value="01">人民法院</Select.Option>
								<Select.Option value="02">公安机关</Select.Option>
								<Select.Option value="03">监狱管理机关</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name={"pjrq"} label="判决日期">
							<DatePicker />
						</Form.Item>
						<Form.Item name={"nsyjzlb"} label="拟适用矫正类别" initialValue={"02"}>
							<Select defaultValue="普通" style={{ width: 170 }}>
								<Select.Option value="01">宽松</Select.Option>
								<Select.Option value="02">普通</Select.Option>
								<Select.Option value="03">严格</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item name={"dcdwxqj"} label="接受委托的县级社区矫正机构">
							<Input style={{ width: 300 }} placeholder={"请输入接受委托的县级矫正机构"} />
						</Form.Item>

						<Form.Item name={"dcpgyj"} label="调查评估意见">
							<TextArea style={{ width: 500 }} placeholder={"请输入调查评估意见"} />
						</Form.Item>

						<Form.Item name={"dcyjshr"} label="调查评估意见审核人">
							<Input placeholder={"请输入调查意见审核人"} />
						</Form.Item>

						<Form.Item name={"dcpgyjs"} label="调查评估意见书">
							<Upload name="yjs" action="/upload.do" listType="picture">
								<Button icon={<UploadOutlined />}>Click to upload</Button>
							</Upload>
						</Form.Item>
					</Form>
				</Card>
				<Card title={"调查评估走访信息表"}>
					<Form
						form={form2}
						initialValues={ieVisitInfo}
					>
						<Form.Item name={"bdcrxm"} label="被调查人姓名">
							<Input placeholder={"请输入姓名"} />
						</Form.Item>
						<Form.Item name={"ybgrgx"} label="与被调查评估对象关系">
							<Input placeholder={"与被调查评估对象关系"} />
						</Form.Item>
						<Form.Item name={"dcsx"} label="调查事项">
							<Input placeholder={"调查事项"} />
						</Form.Item>
						<Form.Item name={"dcsj"} label="调查时间">
							<DatePicker />
						</Form.Item>
						<Form.Item name={"dcdd"} label="调查地点">
							<Input placeholder={"调查地点"} />
						</Form.Item>
						<Form.Item name={"dcdwsfs"} label="调查单位">
							<Input placeholder={"调查单位"} />
						</Form.Item>
						<Form.Item name={"dcr"} label="调查人">
							<Input placeholder={"调查人"} />
						</Form.Item>
					</Form>
				</Card>
			</Space>

		</Modal>
	);
}