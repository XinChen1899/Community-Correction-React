import TemplateModal from "@/template/Modal";
import AddForm from "../../Form/AddForm";
import { GMessage } from "@/utils/msg/GMsg";
import { Form } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { getDate } from "@/utils/ie";
import { saveCheck } from "@/api/daily/check";
import { saveReport } from "@/api/daily/report";

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
		form.submit();
	};

	// 提交表单时操作
	const onFinish = (values: any) => {
		const detail = values;
		detail.date = getDate(detail.date);
		// detail:
		//   dxbh    bg  date
		saveReport(
			detail,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("提交成功");
			},
			(msg: string) => {
				gMsg.onError("提交报告失败" + msg);
			},
			setConfirmLoading
		);
		setOpen(false);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<AddForm
						form={form}
						onFinish={onFinish}
						initialValues={{ date: dayjs() }}
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
