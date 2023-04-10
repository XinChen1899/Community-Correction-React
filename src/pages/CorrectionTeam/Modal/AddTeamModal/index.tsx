import { useState } from "react";
import { Card, Form, Modal } from "antd";

import { GMessage } from "@/utils/msg/GMsg";
import { AddTeamForm } from "../../Form/AddTeamForm";

const AddTeamModal = (props: {
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
			gMsg.onSuccess("新增矫正小组！");
		}, 1000);
	};

	// 提交表单时操作
	const onFinish = async (values: any) => {};

	return (
		<Modal
			width={1000}
			open={open}
			onCancel={() => setOpen(false)}
			confirmLoading={confirmLoading}
			onOk={handleOk}>
			<Card title={"新增矫正小组"}>
				<AddTeamForm
					form={form}
					onFinish={onFinish}
					initialValues={{
						id: 1,
						teamName: "team1",
						monitorName: "谢xx",
					}}
				/>
			</Card>
		</Modal>
	);
};

export default AddTeamModal;
