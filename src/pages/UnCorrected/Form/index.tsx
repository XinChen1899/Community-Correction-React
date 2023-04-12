import "react";
import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";
import { crjzjzlMap, generateSelect, jzlbMap, xbMap } from "@/utils";

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
					component: <Input disabled />,
				},
				{
					name: "jcjzlx",
					label: "解除矫正类型",
				},
				{
					name: "jjrq",
					label: "解除矫正日期",
					component: <DatePicker />,
				},
				{
					name: "JZQJBX",
					label: "矫正期间表现",
				},
				{
					name: "RZTD",
					label: "认罪态度",
				},
				{
					name: "SFCJZYJNPX",
					label: "矫正期间是否参加职业技能培训",
				},
				{
					name: "SFHDZYJNZS",
					label: "矫正期间是否获得职业技能证书",
				},
				{
					name: "JSTCJDJ",
					label: "技术特长及等级",
				},
				{
					name: "WXXPG",
					label: "危险性评估",
				},
				{
					name: "JTLXQK",
					label: "家庭关系",
				},
				{
					name: "TSQKBZJBJJY",
					label: "矫正期间特殊情况备注及帮教建议",
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
