import TemplateForm, { getFormItem } from "@/template/Form";
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
				getFormItem("dxbh", "社区矫正对象编号", <Input />),
				getFormItem(
					"date",
					"提交日期",
					<DatePicker format="YYYY-MM-DD HH:mm:ss" />
				),
			]}
		/>
	);
}
