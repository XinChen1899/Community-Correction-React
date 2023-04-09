import TemplateModal from "@/template/Modal";
import { BBForm } from "../../Form/BBForm";
import { Form } from "antd";
import { BBInfo } from "@/entity/NoExit/BBInfo";
import { getBBForm } from "@/api/NoExit";
import { useState } from "react";
import { GMessage } from "@/coderepo/msg/GMsg";

export default function BBModal(props: {
	open: boolean;
	setOpen: any;
	dxbh: string;
	gMsg: GMessage;
}) {
	const { open, setOpen, dxbh, gMsg } = props;
	const [form] = Form.useForm();
	const [bbForm, setBBForm] = useState<BBInfo>();

	const handleOk = () => {
		form.submit();
		setOpen(false);
	};

	const onFinish = (values: any) => {
		console.log(values);
	};

	const bbInfo: BBInfo = {
		dxbh: "",
		xm: "",
		xb: "",
		sfzh: "",
		crjzjzl: "",
		crjzjhm: "",
		bbsldw: "",
		bbdw: "",
		bbrq: "",
		bbksrq: "",
		bbjsrq: "",
	};

	return (
		<TemplateModal
			title="出入境报备信息"
			InfoDescriptions={
				<BBForm
					form={form}
					onFinish={onFinish}
					initialValues={bbInfo}
				/>
			}
			onOk={handleOk}
			open={open}
			setOpen={setOpen}
			getAPI={(id: string) => {
				getBBForm(
					id,
					(data: any) => {
						setBBForm(data);
					},
					(err: any) => {
						// gMsg.onError("获取报备信息失败！" + err);
					}
				);
			}}
			recordId={dxbh}
		/>
	);
}
