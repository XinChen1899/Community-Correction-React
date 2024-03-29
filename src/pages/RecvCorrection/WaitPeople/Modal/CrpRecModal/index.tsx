import { recvCrp } from "@/api/ic";
import { CorrectionPeople } from "@/entity/IC/Crp";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import dayjs from "dayjs";
import { DataType } from "../..";
import { ReceiveForm } from "../../Form/ReceiveForm";

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

	if (open) {
		selectRecord.csrq = dayjs(selectRecord.csrq);
		form.resetFields();
		form.setFieldsValue(selectRecord);
	}

	const { loading, run } = useRequest(
		(detail: CorrectionPeople) => recvCrp(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("接收入矫成功");
				} else {
					gMsg.onError(data.message);
				}
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
		run(info);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<ReceiveForm
					form={form}
					onFinish={onFinish}
					initialValues={selectRecord}
				/>
			}
			open={open}
			setOpen={setOpen}
			onOk={handleOk}
			confirmLoading={loading}
		/>
	);
}
