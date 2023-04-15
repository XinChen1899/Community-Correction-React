import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { Form } from "antd";
import { useState } from "react";
import ModifyForm from "../../Form/ModifyForm";
import dayjs from "dayjs";
import { ScoreModify } from "@/entity/Assessment/ScoreModify";
import { getDate } from "@/utils/ie";
import { saveScoreModify } from "@/api/assessment/score";

export default function ModifyModal(props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	info: any;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { setOpen, open, gMsg, info, tableUpdate, setTableUpdate } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};

	// 提交表单时操作
	const onFinish = (values: any) => {
		const detail = values as ScoreModify;
		if (values.select == "02") detail.score = -detail.score;
		detail.date = getDate(detail.date);
		console.log(detail);
		// todo 发送计分
		saveScoreModify(
			detail,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("计分成功!");
			},
			(msg: string) => {
				gMsg.onError("计分失败！" + msg);
			}
		);
		setOpen(false);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<ModifyForm
						form={form}
						onFinish={onFinish}
						initialValues={{ date: dayjs(), ...info }}
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
