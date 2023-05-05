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
				getFormItem(
					"dxbh",
					"社区矫正对象编号",
					<Input />,
					true
				),
				getFormItem(
					"sqjrcs",
					"申请进入场所",
					<Input />,
					true
				),
				getFormItem("sqrq", "申请日期", <DatePicker />, true),
				getFormItem("sqjrsj", "申请进入时间", <DatePicker />),
				getFormItem("sqjssj", "申请结束时间", <DatePicker />),
				getFormItem("sqly", "申请理由", <Input.TextArea />),
				getFormItem(
					"sfsshr",
					"受委托的司法所审核人",
					<Input disabled />
				),
				getFormItem(
					"sfsshsj",
					"司法所审核时间",
					<DatePicker disabled />
				),
				getFormItem(
					"sfsshyj",
					"司法所审核意见",
					<Input.TextArea disabled />
				),
				getFormItem(
					"xjsqjzjgspr",
					"县级社区矫正机构审批人",
					<Input disabled />
				),
				getFormItem(
					"xjsqjzjgspsj",
					"县级社区矫正机构审批时间",
					<DatePicker disabled />
				),
				getFormItem(
					"xjsqjzjgspyj",
					"县级社区矫正机构审批意见",
					<Input.TextArea disabled />
				),
			]}
		/>
	);
}
