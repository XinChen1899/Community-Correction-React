import { useState } from "react";
import { Card, Form, Modal } from "antd";

import { GMessage } from "@/coderepo/msg/GMsg";
import { RegisterForm } from "../../Form/RegisterForm";

const RegisterModal = (props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
}) => {
	const { setOpen, open, gMsg } = props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleOk = () => {
		setConfirmLoading(true);
		form.submit();
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 1000);
	};

	// 提交表单时操作
	const onFinish = async (values: any) => {
		gMsg.onSuccess("新增入矫人员!");
	};

	return (
		<Modal
			width={1000}
			open={open}
			onCancel={() => setOpen(false)}
			confirmLoading={confirmLoading}
			onOk={handleOk}>
			<Card title={"矫正人员登记表"}>
				<RegisterForm
					form={form}
					onFinish={onFinish}
					initialValues={{
						sqjzdxbh: "00000001",
						sfdcpg: "否",
						jzlb: "管制",
						xb: "男",
						mz: "汉族",
						gj: "中国籍",
						hjlx: "乡村人口",
						whcd: "其他",
						hyzk: "其他",
						jyjxqk: "就业",
						ywjtcyjzyshgx: "是",
					}}
				/>
			</Card>
		</Modal>
	);
};

export default RegisterModal;
