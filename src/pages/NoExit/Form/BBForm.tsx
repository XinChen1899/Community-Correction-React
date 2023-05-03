import TemplateForm, { getFormItem } from "@/template/Form";
import { crjzjzlMap, generateSelect } from "@/utils";
import { DatePicker, Input } from "antd";
import "react";

/**
 * 出入境报备信息 表单
 */
export function BBForm(props: {
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
					<Input disabled />
				),
				{
					name: "crjzjzl",
					label: "出入境证件种类",
					component: generateSelect(crjzjzlMap, {
						disabled,
					}),
				},
				{
					name: "crjzjhm",
					label: "出入境证件号码",
					component: <Input />,
				},
				{
					name: "bbsldw",
					label: "报备受理单位",
					component: <Input />,
				},
				{
					name: "bbdw",
					label: "报备单位",
					component: <Input />,
				},
				{
					name: "bbrq",
					label: "报备日期",
					component: <DatePicker />,
				},
				{
					name: "bbksrq",
					label: "报备开始日期",
					component: <DatePicker />,
				},
				{
					name: "bbjsrq",
					label: "报备结束日期",
					component: <DatePicker />,
				},
			]}
		/>
	);
}
