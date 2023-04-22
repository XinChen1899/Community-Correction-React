import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";
import "react";

export default function AnnouncementForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;

	return (
		<TemplateForm
			disabled={disabled}
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}
			formTable={[
				{
					name: "dxbh",
					label: "社区矫正对象编号",
					component: <Input />,
				},
				{
					name: "xgrq",
					label: "宣告日期",
					component: <DatePicker />,
				},
			]}
		/>
	);
}
