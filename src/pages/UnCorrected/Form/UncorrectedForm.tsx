import TemplateForm from "@/template/Form";
import { generateSelect, jcjzlxMap, spjgMap } from "@/utils";
import { DatePicker, Input } from "antd";
import "react";

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
					name: "jcjzrq",
					label: "解除矫正日期",
					component: <DatePicker />,
				},
				{
					name: "jzqjbx",
					label: "矫正期间表现",
					component: <Input />,
				},
				{
					name: "rztd",
					label: "认罪态度",
					component: <Input />,
				},
				{
					name: "sfcjzyjnpx",
					label: "矫正期间是否参加职业技能培训",
					component: <Input />,
				},
				{
					name: "sfhdzyjnzs",
					label: "矫正期间是否获得职业技能证书",
					component: <Input />,
				},
				{
					name: "jstcjdj",
					label: "技术特长及等级",
					component: <Input />,
				},
				{
					name: "wxxpg",
					label: "危险性评估",
					component: <Input />,
				},
				{
					name: "jtgx",
					label: "家庭关系",
					component: <Input />,
				},
				{
					name: "tsqkbzjbjjy",
					label: "矫正期间特殊情况备注及帮教建议",
					component: <Input />,
				},
				{
					name: "bz",
					label: "备注",
					component: <Input />,
				},
				{
					name: "spjg",
					label: "审批结果",
					component: generateSelect(spjgMap),
				},
			]}
		/>
	);
}
