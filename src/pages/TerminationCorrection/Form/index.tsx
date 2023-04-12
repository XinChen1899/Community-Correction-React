import "react";
import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";
import {
	crjzjzlMap,
	generateSelect,
	jzlbMap,
	sjMap,
	sjzxlxMap,
	xbMap,
	zzjzlxMap,
} from "@/utils";

/**
 * 矫正解除（终止）信息 表单
 */
export function TerminationForm(props: {
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
					name: "zzjzlx",
					label: "终止矫正类型",
					component: generateSelect(zzjzlxMap),
				},
				{
					name: "jjrq",
					label: "终止矫正日期",
					component: <DatePicker />,
				},
				{
					name: "sfsj",
					label: "是否收监",
					component: generateSelect(sjMap),
				},
				{
					name: "sjzxlx",
					label: "收监执行类型",
					component: generateSelect(sjzxlxMap, 300),
				},
				{
					name: "sjzxrq",
					label: "收监执行日期",
					component: <DatePicker />,
				},
				{
					name: "cxhxsjzxyy",
					label: "撤销缓刑收监执行原因",
					component: <Input />,
				},
				{
					name: "CXJSSJZXYY",
					label: "撤销假释收监执行原因",
					component: <Input />,
				},
				{
					name: "SJZXYY",
					label: "收监执行原因",
					component: <Input />,
				},
				{
					name: "SWSJ",
					label: "死亡日期",
					component: <DatePicker />,
				},
				{
					name: "SWLX",
					label: "死亡类型",
					component: <Input />,
				},
				{
					name: "JTSY",
					label: "具体死因",
					component: <Input />,
				},
				{
					name: "JZQJBX",
					label: "矫正期间表现",
					component: <Input />,
				},
				{
					name: "RZTD",
					label: "认罪态度",
					component: <Input />,
				},
				{
					name: "SFCJZYJNPX",
					label: "矫正期间是否参加职业技能培训",
					component: <Input />,
				},
				{
					name: "SFHDZYJNZS",
					label: "矫正期间是否获得职业技能证书",
					component: <Input />,
				},
				{
					name: "JSTCJDJ",
					label: "技术特长及等级",
					component: <Input />,
				},
				{
					name: "WXXPG",
					label: "危险性评估",
					component: <Input />,
				},
				{
					name: "JTLXQK",
					label: "家庭关系",
					component: <Input />,
				},
				{
					name: "TSQKBZJBJJY",
					label: "矫正期间特殊情况备注及帮教建议",
					component: <Input />,
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
