import TemplateForm from "@/template/Form";
import {
	bdcpgrdlxMap,
	fjxMap,
	generateSelect,
	nsyjzlbMap,
	pjjgMap,
	wtdwMap,
	xbMap,
	ypxfMap,
	zmMap,
} from "@/utils";
import { DatePicker, Input } from "antd";
import "react";

const { TextArea } = Input;

export function IEInfoForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled: boolean;
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
					name: "wtbh",
					label: "委托编号",
					component: <Input disabled />,
				},
				{
					name: "wtdw",
					label: "委托单位",
					component: generateSelect(wtdwMap, {
						disabled,
					}),
				},
				{
					name: "wtdch",
					label: "委托调查函",
					component: (
						<TextArea placeholder={"请输入委托调查函"} />
					),
				},
				{
					name: "bdcpgrdlx",
					label: "被调查评估对象的类型",
					component: generateSelect(bdcpgrdlxMap, {
						disabled,
					}),
				},
				{
					name: "bgrxm",
					label: "被调查评估对象姓名",
					component: <Input placeholder={"请输入姓名"} />,
				},
				{
					name: "bgrxb",
					label: "被调查评估对象性别",
					component: generateSelect(xbMap, {
						disabled,
					}),
				},
				{
					name: "bgrsfzh",
					label: "被调查评估对象的身份证号",
					component: <Input placeholder={"请输入身份证"} />,
				},
				{
					name: "bgrcsrq",
					label: "被调查评估对象出生日期",
					component: <DatePicker />,
				},
				{
					name: "bgrjzddz",
					label: "被调查评估对象居住地地址",
					component: (
						<Input placeholder={"请输入居住地址"} />
					),
				},
				{
					name: "bgrgzdw",
					label: "被调查评估对象工作单位",
					component: (
						<Input placeholder={"请输入工作单位"} />
					),
				},
				{
					name: "zm",
					label: "罪名",
					component: generateSelect(zmMap, {
						disabled,
					}),
				},
				{
					name: "ypxq",
					label: "原判刑期",
					component: (
						<Input placeholder={"请输入原判刑期"} />
					),
				},
				{
					name: "ypxqksrq",
					label: "原判刑期开始日期",
					component: <DatePicker />,
				},
				{
					name: "ypxqjsrq",
					label: "原判刑期结束日期",
					component: <DatePicker />,
				},
				{
					name: "ypxf",
					label: "原判刑罚",
					component: generateSelect(ypxfMap, {
						disabled,
					}),
				},
				{
					name: "fjx",
					label: "附加刑",
					component: generateSelect(fjxMap, {
						disabled,
					}),
				},
				{
					name: "pjjg",
					label: "判决机关",
					component: generateSelect(pjjgMap, {
						disabled,
					}),
				},
				{
					name: "pjrq",
					label: "判决日期",
					component: <DatePicker />,
				},
				{
					name: "nsyjzlb",
					label: "拟适用矫正类别",
					component: generateSelect(nsyjzlbMap, {
						disabled,
					}),
				},
				{
					name: "dcdwxqj",
					label: "接受委托的县级社区矫正机构",
					component: (
						<Input
							style={{ width: 300 }}
							placeholder={
								"请输入接受委托的县级矫正机构"
							}
						/>
					),
				},
			]}
		/>
	);
}
