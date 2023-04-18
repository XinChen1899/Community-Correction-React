import "react";
import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";
import { generateSelect, jcjzlxMap, rztdMap } from "@/utils";

/**
 * 矫正解除（终止）信息 表单
 */
export function UncorrectForm(props: {
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
					name: "jcjzlx",
					label: "解除矫正类型",
					component: generateSelect(jcjzlxMap),
				},
				{
					name: "jjrq",
					label: "解除矫正日期",
					component: <DatePicker />,
				},
				{
					name: "rztd",
					label: "认罪态度",
					component: generateSelect(rztdMap),
				},
				{
					name: "bz",
					label: "备注",
					component: <Input />,
				},
			]}
		/>
	);
}
