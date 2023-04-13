import { useState } from "react";
import { Card, Form } from "antd";

import "@/entity/IE/IEInfo";
import { GMessage } from "@/utils/msg/GMsg";
import { AddTeamForm } from "../../Form/AddTeamForm";
import TemplateModal from "@/template/Modal";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import { savePlan } from "@/api/ic/crplan";

const AddModal = (props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) => {
	const { setOpen, open, gMsg, tableUpdate, setTableUpdate } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};

	// 提交表单时操作
	const onFinish = (values: any) => {
		const info = values as CrpPlan;
		savePlan(
			info,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("新增矫正方案!");
			},
			(msg: string) => {
				gMsg.onError("矫正方案保存失败!" + msg);
			},
			setConfirmLoading
		);
		setOpen(false);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<Card title={"新增矫正方案"}>
						<AddTeamForm
							form={form}
							onFinish={onFinish}
							initialValues={{
								dxbh: "00000001",
							}}
						/>
					</Card>
				}
				open={open}
				setOpen={setOpen}
				confirmLoading={confirmLoading}
				onOk={handleOk}
			/>
		</>
	);
};

export default AddModal;
