import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { Form } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { getDate } from "@/utils/ie";
import { saveCheck } from "@/api/daily/check";
import { useRequest } from "ahooks";
import { UncorrectForm } from "../Form";
import AnnouncementForm from "../Form/AnnouncementForm";

export default function AddAnnouncementModal(props: {
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
			// detail.date = getDate(detail.date);
			// run(detail);
		}
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<AnnouncementForm
						form={form}
						onFinish={onFinish}
						initialValues={{}}
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
