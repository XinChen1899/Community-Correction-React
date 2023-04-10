import { Form } from "antd";
import { useEffect } from "react";

export default function TemplateForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	formTable: any[];
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, formTable, disabled } =
		props;
	// const formTable = [
	// 	{ name: "xxx", label: "xxx", component: <></> },
	// ];

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(initialValues);
	}, [initialValues]);
	return (
		<Form
			disabled={disabled}
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			{formTable.map((item, idx) => {
				return (
					<Form.Item
						name={item.name}
						label={item.label}
						key={idx}>
						{item.component}
					</Form.Item>
				);
			})}
		</Form>
	);
}
