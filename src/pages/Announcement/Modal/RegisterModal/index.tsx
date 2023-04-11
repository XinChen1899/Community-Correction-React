import TemplateModal from "@/template/Modal";
import RegisterForm from "../../Form/RegisterForm";
import { GMessage } from "@/utils/msg/GMsg";
import { Form } from "antd";
import { useState } from "react";

export default function RegisterModal(props: {
	open: boolean;
	setOpen: any;
	dxbh: string;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
	infoUpdate: boolean;
	setInfoUpdate: any;
}) {
	const {
		setOpen,
		open,
		gMsg,
		dxbh,
		tableUpdate,
		setTableUpdate,
		infoUpdate,
		setInfoUpdate,
	} = props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleOk = () => {
		// setConfirmLoading(true);
		form.submit();
	};

	// 提交表单时操作
	const onFinish = (values: any) => {
		// const crp = values as CorrectionPeople;
		// crp.csrq = getDate(crp.csrq);
		// registerCrp(
		// 	crp,
		// 	() => {
		// 		gMsg.onSuccess("登记成功！");
		// 		setTableUpdate(!tableUpdate);
		// 		setInfoUpdate(!infoUpdate);
		// 		setOpen(false);
		// 		setConfirmLoading(false);
		// 	},
		// 	(msg: string) => {
		// 		gMsg.onError("登记失败！" + msg);
		// 	}
		// );
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
				getAPI={undefined}
				recordId={dxbh}
			/>
		</>
	);
}
