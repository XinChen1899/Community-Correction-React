import TemplateModal from "@/template/Modal";
import AddForm from "../../Form/AddForm";
import { GMessage } from "@/utils/msg/GMsg";
import { Form } from "antd";
import { useState } from "react";
import { DataType } from "../..";
import { saveBanInfo } from "@/api/business/ban";
import { BBInfo } from "@/entity/NoExit/BBInfo";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import { getDate } from "@/utils/ie";

export default function AddModal(props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
	info?: DataType;
}) {
	const { setOpen, open, gMsg, tableUpdate, setTableUpdate, info } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};

	// 提交表单时操作
	const onFinish = (values: any) => {
		const detail = values as BanInfo;
		detail.step = info ? info.step : 0;
		detail.sqrq = getDate(detail.sqrq);
		detail.sqjrsj = getDate(detail.sqjrsj);
		detail.sqjssj = getDate(detail.sqjssj);

		saveBanInfo(
			detail,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("新增成功");
			},
			(msg: string) => {
				gMsg.onError("新增失败！" + msg);
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
						initialValues={info}
						disabled={info && info.step > 0}
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
