import { Form, FormInstance } from "antd";

interface IFormItem {
	name?: string;
	label: string;
	component?: JSX.Element;
	rules?: any[];
	children?: IFormItem[];
}

export const getFormItem = (
	name: string,
	label: string,
	component: JSX.Element,
	required?: boolean,
	children?: IFormItem[]
): IFormItem => {
	return {
		name,
		label,
		component,
		rules: [{ required }],
		children,
	};
};

export default function TemplateForm(props: {
	form: FormInstance<any>;
	onFinish: any;
	initialValues: any;
	formTable: IFormItem[];
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, formTable, disabled } =
		props;

	form.resetFields();
	form.setFieldsValue(initialValues);

	return (
		<Form
			disabled={disabled}
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			{formTable.map((item, idx) => (
				<Form.Item
					name={item.name}
					label={item.label}
					rules={item.rules}
					key={idx}>
					{item.component}
				</Form.Item>
			))}
		</Form>
	);
}
