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
					name: "sqjrcs",
					label: "申请进入场所",
					component: <Input />,
				},
				{
					name: "sqrq",
					label: "申请日期",
					component: <DatePicker />,
				},
				{
					name: "sqjrsj",
					label: "申请进入时间",
					component: <DatePicker />,
				},
				{
					name: "sqjssj",
					label: "申请结束时间",
					component: <DatePicker />,
				},
				{
					name: "sqly",
					label: "申请理由",
					component: <Input.TextArea />,
				},
				{
					name: "sfsshr",
					label: "受委托的司法所审核人",
					component: <Input disabled />,
				},
				{
					name: "sfsshsj",
					label: "法所审核时间",
					component: <DatePicker disabled />,
				},
				{
					name: "sfsshyj",
					label: "司法所审核意见",
					component: <Input.TextArea disabled />,
				},
				{
					name: "xjsqjzjgspr",
					label: "县级社区矫正机构审批人",
					component: <Input disabled />,
				},
				{
					name: "xjsqjzjgspr",
					label: "县级社区矫正机构审批人",
					component: <Input disabled />,
				},
				{
					name: "xjsqjzjgspsj",
					label: "县级社区矫正机构审批时间",
					component: <DatePicker disabled />,
				},
				{
					name: "xjsqjzjgspyj",
					label: "县级社区矫正机构审批意见",
					component: <Input disabled />,
				},
			]}
		/>
	);
}
