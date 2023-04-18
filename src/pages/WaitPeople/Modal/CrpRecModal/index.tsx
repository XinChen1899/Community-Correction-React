import { Card, Form } from "antd";
import { useEffect } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { DataType } from "../..";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { ReceiveForm } from "../../Form/ReceiveForm";
import TemplateModal from "@/template/Modal";
import { getDate } from "@/utils/ie";
import { recvCrp } from "@/api/ic";
import dayjs from "dayjs";
import { useRequest } from "ahooks";

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

	const [form] = Form.useForm();

	useEffect(() => {
		selectRecord.csrq = dayjs(selectRecord.csrq);
		form.resetFields();
		form.setFieldsValue(selectRecord);
	});
	const { loading, run } = useRequest(
		(detail: CorrectionPeople) => recvCrp(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("接收入矫成功");
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			onFinally: () => {
				setOpen(false);
			},
			manual: true,
			debounceWait: 300,
		}
	);
	const onFinish = (values: any) => {
		const info = values as CorrectionPeople;
		info.csrq = getDate(info.csrq);
		console.log(info);
		run(info);
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
				confirmLoading={loading}
			/>
		</>
	);
}
