import TemplateModal from "@/template/Modal";
import { Form } from "antd";
import { useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { CategoryInfo } from "@/entity/Category/CategoryInfo";
import { TerminationForm } from "../../Form";

// todo 报备流程审批

export default function RecvModal(props: {
	open: boolean;
	setOpen: any;
	dxbh: string;
	gMsg: GMessage;
	infoUpdate: boolean;
	setInfoUpdate: any;
}) {
	const { open, setOpen, dxbh, gMsg, infoUpdate, setInfoUpdate } =
		props;
	const [form] = Form.useForm();
	const [info, setInfo] = useState<CategoryInfo>();

	const handleOk = () => {
		form.submit();
		setOpen(false);
	};

	const onFinish = (values: any) => {
		console.log(values);
	};

	return (
		<TemplateModal
			title="终止矫正信息表"
			infoUpdate={infoUpdate}
			InfoDescriptions={
				<TerminationForm
					form={form}
					onFinish={onFinish}
					initialValues={info}
				/>
			}
			onOk={handleOk}
			open={open}
			setOpen={setOpen}
			getAPI={undefined}
			recordId={dxbh}></TemplateModal>
	);
}
