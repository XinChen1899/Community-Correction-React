import "react";
import TemplateForm from "@/template/Form";
import { Input } from "antd";
import { generateSelect, nsyjzlbMap } from "@/utils";

/**
 * 分类管理 表单
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
					name: "xm",
					label: "姓名",
					component: <Input disabled />,
				},
				{
					name: "gllb",
					label: "管理类别",
					component: generateSelect(nsyjzlbMap),
				},
			]}
		/>
	);
}
