import { Form } from "antd";
import { useEffect, useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { DataType } from "../..";
import { RegisterForm } from "../../Form/RegisterForm";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { updateCrp } from "@/api/ic";
import dayjs from "dayjs";
import { getDate } from "@/utils/ie";
import { mzMap } from "@/utils";
import TemplateModal from "@/template/Modal";

export default function CrpModifyModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const {
		open,
		setOpen,
		selectRecord,
		gMsg,
		tableUpdate,
		setTableUpdate,
	} = props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		selectRecord.csrq = dayjs(selectRecord.csrq);
		selectRecord.xgrq = dayjs(selectRecord.xgrq);
		form.resetFields();
		form.setFieldsValue(selectRecord);
	});

	const onFinish = async (values: any) => {
		const crp = values as CorrectionPeople;
		crp.csrq = getDate(crp.csrq);
		updateCrp(
			crp,
			() => {
				gMsg.onSuccess("修改成功！");
				setTableUpdate(!tableUpdate);
			},
			(msg: string) => {
				gMsg.onError("修改失败！" + msg);
			},
			setConfirmLoading
		);
		setOpen(false);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<RegisterForm
						form={form}
						onFinish={onFinish}
						initialValues={selectRecord}
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
