import { Form } from "antd";

export default function TemplateForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	formTable: any[];
}) {
	const { form, onFinish, initialValues, formTable } = props;
	// const formTable = [
	// 	{ name: "xxx", label: "xxx", component: <></> },
	// ];
	return (
		<Form
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
