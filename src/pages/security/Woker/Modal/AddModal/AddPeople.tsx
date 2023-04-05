import { useState } from "react";
import { Card, Form, Modal } from "antd";

import "@/entity/IE/IEInfo";
import { GMessage } from "@/coderepo/msg/GMsg";
import { WorkerForm } from "../../Form/WorkerForm";

const AddModal = (props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
}) => {
	const { setOpen, open, gMsg } = props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleCancel = () => {
		setOpen(false);
	};

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
		gMsg.onSuccess("新增待入矫人员!");
	};

	return (
		<Modal
			width={1000}
			open={open}
			onCancel={handleCancel}
			confirmLoading={confirmLoading}
			onOk={handleOk}>
			<Card title={"新增待矫正人员信息表"}>
				<WorkerForm
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

export default AddModal;
