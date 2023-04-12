import { useState } from "react";
import { Form } from "antd";

import { GMessage } from "@/utils/msg/GMsg";
import { RegisterForm } from "../../Form/RegisterForm";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { getDate } from "@/utils/ie";
import { registerCrp } from "@/api/ic";
import TemplateModal from "@/template/Modal";

const RegisterModal = (props: {
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
		const crp = values as CorrectionPeople;
		crp.csrq = getDate(crp.csrq);

		registerCrp(
			crp,
			() => {
				setTableUpdate(!tableUpdate);
				setOpen(false);
				gMsg.onSuccess("登记成功！");
			},
			(msg: string) => {
				gMsg.onError("登记失败！" + msg);
			},
			setConfirmLoading
		);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<RegisterForm
						form={form}
						onFinish={onFinish}
						initialValues={{}}
					/>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				confirmLoading={confirmLoading}
			/>
		</>
	);
};

export default RegisterModal;
