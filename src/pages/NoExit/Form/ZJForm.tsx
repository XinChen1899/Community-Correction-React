import TemplateForm from "@/template/Form";
import { generateSelect, zjMap } from "@/utils";
import { Input } from "antd";
import "react";

/**
 * 出入境证件代管信息 表单
 */
export function ZJForm(props: {
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
					name: "zj",
					label: "证件代管类型",
					component: generateSelect(zjMap, {
						disabled,
					}),
				},
			]}
		/>
	);
}
