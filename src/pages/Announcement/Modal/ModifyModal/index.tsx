import { Form } from "antd";
import { useEffect, useState } from "react";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import TemplateModal from "@/template/Modal";
import { DataType } from "../..";
import RegisterForm from "../../Form/RegisterForm";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import { updateAnnounce } from "@/api/ic/announce";

interface ITaskInfoModal {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	gMsg: GMessage;
}

export default function ModifyModal(props: ITaskInfoModal) {
	const { open, setOpen, info, setTableUpdate, tableUpdate, gMsg } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(info);
	});

	const onFinish = (values: any) => {
		const info = values as CrpAnnouncement;
		info.xgrq = getDate(info.xgrq);

		updateAnnounce(
			info,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("修改成功！");
			},
			(msg: string) => {
				gMsg.onError("修改失败！" + msg);
			}
		);
		setConfirmLoading(false);
		setOpen(false);
	};

	const handleOk = () => {
		form.submit();
		setConfirmLoading(true);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<RegisterForm
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
