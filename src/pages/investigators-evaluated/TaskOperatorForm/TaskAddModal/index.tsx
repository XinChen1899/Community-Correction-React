import React, { useState } from "react";
import { Button, Card, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "@/entity/IE/IEInfo";
import { IEInfo } from "@/entity/IE/IEInfo";

const { TextArea } = Input;

const TaskAddModal = (props: { open: boolean, setOpen: any }) => {
	const { setOpen, open } = props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleCancel = () => {
		setOpen(false);
	};

	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
			form.submit();
		}, 2000);
	};

	const onFinish = (values: any) => {
		const info = values as IEInfo;
		console.log(info);

		// todo 提交给数据库
	};


	return (
		<Modal width={1000}
			   open={open}
			   title={"新增调查评估"}
			   onCancel={handleCancel}
			   confirmLoading={confirmLoading}
			   onOk={handleOk}
		>
			<Card title={"调查评估信息表"}>
				<Form form={form} onFinish={onFinish}>
					<Form.Item name={"WTBH"} initialValue={"00000001"} label={"委托编号"}>
						<Input disabled={true} />
					</Form.Item>
					<Form.Item name={"WTDW"} label="委托单位">
						<Input placeholder={"请输入委托单位"} />
					</Form.Item>
					<Form.Item name={"WTDCH"} label="委托调查函">
						<TextArea placeholder={"请输入委托调查函"} />
					</Form.Item>
					<Form.Item name={"BDCPGRDLX"} label="被调查评估对象的类型" initialValue={"01"}>
						<Select defaultValue="被告人" style={{ width: 120 }}>
							<Select.Option value="01">被告人</Select.Option>
							<Select.Option value="02">罪犯</Select.Option>
							<Select.Option value="99">其他</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name={"BGRXM"} label="被调查评估对象姓名">
						<Input placeholder={"请输入姓名"} />
					</Form.Item>
					<Form.Item name={"BGRXB"} label="被调查评估对象性别" initialValue={"male"}>
						<Select defaultValue="男" style={{ width: 120 }}>
							<Select.Option value="male">男</Select.Option>
							<Select.Option value="female">女</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name={"BGRSFZH"} label="被调查评估对象的身份证号">
						<Input placeholder={"请输入身份证"} />
					</Form.Item>
					<Form.Item name={"BGRCSRQ"} label="被调查评估对象出生日期">
						<DatePicker />
					</Form.Item>
					<Form.Item name={"BGRJZDDZ"} label="被调查评估对象居住地地址">
						<Input placeholder={"请输入居住地址"} />
					</Form.Item>
					<Form.Item name={"BGRGZDW"} label="被调查评估对象工作单位">
						<Input placeholder={"请输入工作单位"} />
					</Form.Item>
					<Form.Item name={"ZM"} label="罪名" initialValue={"01"}>
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
					<Form.Item name={"YPXQ"} label="原判刑期">
						<Input placeholder={"请输入原判刑期"} />
					</Form.Item>
					<Form.Item name={"YPXQKSRQ"} label="原判刑期开始日期">
						<DatePicker />
					</Form.Item>
					<Form.Item name={"YPXQJSRQ"} label="原判刑期结束日期">
						<DatePicker />
					</Form.Item>
					<Form.Item name={"YPXF"} label="原判刑罚" initialValue={"01"}>
						<Select defaultValue="死刑缓期两年执行" style={{ width: 170 }}>
							<Select.Option value="01">死刑缓期两年执行</Select.Option>
							<Select.Option value="02">无期徒刑</Select.Option>
							<Select.Option value="03">有期徒刑</Select.Option>
							<Select.Option value="04">拘役</Select.Option>
							<Select.Option value="05">管制</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name={"FJX"} label="附加刑" initialValue={"99"}>
						<Select defaultValue="无" style={{ width: 170 }}>
							<Select.Option value="01">罚金</Select.Option>
							<Select.Option value="02">剥夺政治权利</Select.Option>
							<Select.Option value="03">没收财产</Select.Option>
							<Select.Option value="04">驱逐出境</Select.Option>
							<Select.Option value="05">无</Select.Option>
							<Select.Option value="99">其他</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name={"PJJG"} label="判决机关" initialValue={"01"}>
						<Select defaultValue="人民法院" style={{ width: 170 }}>
							<Select.Option value="01">人民法院</Select.Option>
							<Select.Option value="02">公安机关</Select.Option>
							<Select.Option value="03">监狱管理机关</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item name={"PJRQ"} label="判决日期">
						<DatePicker />
					</Form.Item>
					<Form.Item name={"NSYJZLB"} label="拟适用矫正类别" initialValue={"02"}>
						<Select defaultValue="普通" style={{ width: 170 }}>
							<Select.Option value="01">宽松</Select.Option>
							<Select.Option value="02">普通</Select.Option>
							<Select.Option value="03">严格</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item name={"DCDWXQJ"} label="接受委托的县级社区矫正机构">
						<Input style={{ width: 300 }} placeholder={"请输入接受委托的县级矫正机构"} />
					</Form.Item>

					<Form.Item name={"DCPGYJ"} label="调查评估意见">
						<TextArea style={{ width: 500 }} placeholder={"请输入调查评估意见"} />
					</Form.Item>

					<Form.Item name={"DCYJSHR"} label="调查评估意见审核人">
						<Input placeholder={"请输入调查意见审核人"} />
					</Form.Item>

					<Form.Item name={"DCPGYJS"} label="调查评估意见书">
						<Upload name="yjs" action="/upload.do" listType="picture">
							<Button icon={<UploadOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>
				</Form>
			</Card>
		</Modal>
	);
};

export default TaskAddModal;