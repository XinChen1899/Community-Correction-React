import "react";
import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";

export default function AddForm(props: {
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
					name: "date",
					label: "报到日期",
					component: (
						<DatePicker format="YYYY-MM-DD HH:mm:ss" />
					),
				},
			]}
		/>
	);
}
