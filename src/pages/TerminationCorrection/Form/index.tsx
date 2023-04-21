import TemplateForm from "@/template/Form";
import { generateSelect, sjMap, sjzxlxMap, spjgMap, zzjzlxMap } from "@/utils";
import { DatePicker, Input } from "antd";

/**
 * 矫正解除（终止）信息 表单
 */
export default function TerminationForm(props: {
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
					name: "zzjzrq",
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
					component: generateSelect(sjzxlxMap),
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
					name: "cxjssjzxyy",
					label: "撤销假释收监执行原因",
					component: <Input />,
				},
				{
					name: "sjzxyy",
					label: "收监执行原因",
					component: <Input />,
				},
				{
					name: "swsj",
					label: "死亡日期",
					component: <DatePicker />,
				},
				{
					name: "swlx",
					label: "死亡类型",
					component: <Input />,
				},
				{
					name: "jtsy",
					label: "具体死因",
					component: <Input />,
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
