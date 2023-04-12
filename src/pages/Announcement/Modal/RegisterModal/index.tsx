import TemplateModal from "@/template/Modal";
import RegisterForm from "../../Form/RegisterForm";
import { GMessage } from "@/utils/msg/GMsg";
import { Form } from "antd";
import { useState } from "react";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import { getDate } from "@/utils/ie";
import { saveAnnounce } from "@/api/ic/announce";

export default function RegisterModal(props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { setOpen, open, gMsg, tableUpdate, setTableUpdate } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleOk = () => {
		setConfirmLoading(true);
		form.submit();
	};

	// 提交表单时操作
	const onFinish = (values: any) => {
		const crp = values as CrpAnnouncement;
		crp.xgrq = getDate(crp.xgrq);
		saveAnnounce(
			crp,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("登记成功！");
			},
			(msg: string) => {
				gMsg.onError("登记失败！" + msg);
			}
		);
		setOpen(false);
		setConfirmLoading(false);
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
}
