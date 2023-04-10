import "react";
import TemplateForm from "@/template/Form";
import { DatePicker, Input } from "antd";
import {
	crjzjzlMap,
	generateSelect,
	jzlbMap,
	xbMap,
} from "@/coderepo";

/**
 * 出入境报备信息 表单
 */
export function CategoryForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;
	// useEffect(() => {
	// 	form.resetFields();
	// }, []);
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
					name: "jzlb",
					label: "矫正类别",
					component: generateSelect(jzlbMap),
				},
			]}
		/>
	);
}
