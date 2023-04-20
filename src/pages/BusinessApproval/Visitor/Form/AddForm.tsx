import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";
import "react";

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
					name: "hjrxm",
					label: "会见人姓名",
					component: <Input />,
				},
				{
					name: "hksj",
					label: "会客时间",
					component: <DatePicker />,
				},
				{
					name: "hkdd",
					label: "会客地点",
					component: <Input />,
				},
				{
					name: "hkyy",
					label: "会客原因",
					component: <Input />,
				},
				{
					name: "sqrq",
					label: "申请日期",
					component: <DatePicker />,
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
