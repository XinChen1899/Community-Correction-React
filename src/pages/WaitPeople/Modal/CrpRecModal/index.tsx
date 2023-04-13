import { Card, Form } from "antd";
import { useEffect, useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { DataType } from "../..";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { ReceiveForm } from "../../Form/ReceiveForm";
import TemplateModal from "@/template/Modal";
import { getDate } from "@/utils/ie";
import { recvCrp } from "@/api/ic";
import dayjs from "dayjs";

export default function CrpRecModal(props: {
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

	const onFinish = (values: any) => {
		const info = values as CorrectionPeople;
		info.csrq = getDate(info.csrq);
		info.xgrq = getDate(info.xgrq);
		console.log(info);

		recvCrp(
			info,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("接收入矫成功!");
			},
			(msg: string) => {
				gMsg.onError("接收失败! " + msg);
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
					<Card
						title={"接收入矫"}
						style={{ width: "900px" }}>
						<ReceiveForm
							form={form}
							onFinish={onFinish}
							initialValues={selectRecord}
						/>
					</Card>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				confirmLoading={confirmLoading}
			/>
		</>
	);
}
