import { Form } from "antd";
import { useEffect, useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import TemplateModal from "@/template/Modal";
import { DataType } from "../..";
import { AddTeamForm } from "../../Form/AddTeamForm";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import { updatePlan } from "@/api/ic/crplan";

export default function ModifyModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, setTableUpdate, tableUpdate, gMsg } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(info);
	});

	const onFinish = (values: any) => {
		const info = values as CrpPlan;
		updatePlan(
			info,
			() => {
				setTableUpdate(!tableUpdate);
				setOpen(false);
				gMsg.onSuccess("修改成功！");
			},
			(msg: string) => {
				gMsg.onError("修改失败！" + msg);
			},
			setConfirmLoading
		);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<AddTeamForm
						form={form}
						onFinish={onFinish}
						initialValues={info}
					/>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				confirmLoading={confirmLoading}
			/>
		</>
	);
}
