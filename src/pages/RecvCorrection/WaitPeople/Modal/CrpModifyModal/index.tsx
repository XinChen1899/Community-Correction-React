import { updateCrp } from "@/api/ic";
import { CorrectionPeople } from "@/entity/IC/Crp";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { DataType } from "../..";
import { RegisterForm } from "../../Form/RegisterForm";

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

	const [form] = Form.useForm();

	useEffect(() => {
		console.log(selectRecord);
		selectRecord.csrq = dayjs(selectRecord.csrq);
		form.resetFields();
		form.setFieldsValue(selectRecord);
	});

	const { loading, run } = useRequest(
		(detail: CorrectionPeople) => updateCrp(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("修改成功！");
				} else {
					gMsg.onError(data.message);
					console.log(data.message);
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
		const crp = values as CorrectionPeople;
		console.log(values);
		crp.zp = form.getFieldValue("zp");
		run(crp);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<RegisterForm
					form={form}
					onFinish={onFinish}
					initialValues={selectRecord}
					gMsg={gMsg}
					disabled={true}
				/>
			}
			open={open}
			setOpen={setOpen}
			onOk={handleOk}
			confirmLoading={loading}
		/>
	);
}
