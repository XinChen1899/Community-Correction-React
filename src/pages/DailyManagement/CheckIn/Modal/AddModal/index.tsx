import TemplateModal from "@/template/Modal";
import AddForm from "../../Form/AddForm";
import { GMessage } from "@/utils/msg/GMsg";
import { Form } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { getDate } from "@/utils/ie";
import { saveCheck } from "@/api/daily/check";
import { useRequest } from "ahooks";

export default function RegisterModal(props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { setOpen, open, gMsg, tableUpdate, setTableUpdate } =
		props;

	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};
	const { loading, run } = useRequest(
		(detail: any) => saveCheck(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("报到成功！");
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
		const detail = values;
		if (detail && detail.dxbh != "") {
			detail.date = getDate(detail.date);
			run(detail);
		}
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
				confirmLoading={loading}
			/>
		</>
	);
}
