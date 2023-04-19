import TemplateForm from "@/template/Form";
import { generateSelect, nsyjzlbMap } from "@/utils";
import { DatePicker, Input } from "antd";
import "react";

/**
 * 变更分类管理 表单
 */
export function CategoryForm(props: {
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
					component: <Input disabled />,
				},
				{
					name: "gllb",
					label: "管理类别",
					component: generateSelect(nsyjzlbMap, {
						disabled: true,
					}),
				},
				{
					name: "tzyy",
					label: "调整原因",
					component: <Input disabled />,
				},
				{
					name: "bdrq",
					label: "变动日期",
					component: <DatePicker disabled />,
				},
				{
					name: "sfsshr",
					label: "受委托的司法所审核人",
					component: <Input disabled />,
				},
				{
					name: "sfsshsj",
					label: "司法所审核时间",
					component: <DatePicker disabled />,
				},
				{
					name: "sfsshyj",
					label: "司法所审核意见",
					component: <Input disabled />,
				},
				{
					name: "xjsqjzjgspr",
					label: "县级社区矫正机构审批人",
					component: <Input />,
				},
				{
					name: "xjsqjzjgspsj",
					label: "县级社区矫正机构审批时间",
					component: <DatePicker />,
				},
				{
					name: "xjsqjzjgspyj",
					label: "县级社区矫正机构审批意见",
					component: <Input />,
				},
			]}
		/>
	);
}
