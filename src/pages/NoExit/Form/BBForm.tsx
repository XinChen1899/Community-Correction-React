import "react";
import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";
import { crjzjzlMap, generateSelect, xbMap } from "@/utils";

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
				{
					name: "dxbh",
					label: "社区矫正对象编号",
					component: <Input disabled />,
				},
				{
					name: "xm",
					label: "姓名",
					component: <Input />,
				},
				{
					name: "xb",
					label: "性别",
					component: generateSelect(xbMap),
				},
				{
					name: "sfzh",
					label: "身份证号",
					component: <Input />,
				},
				{
					name: "crjzjzl",
					label: "出入境证件种类",
					component: generateSelect(crjzjzlMap),
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
