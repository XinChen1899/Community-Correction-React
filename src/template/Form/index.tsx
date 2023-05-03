import { Form } from "antd";
import { useEffect } from "react";

interface IFormItem {
	name: string;
	label: string;
	component: JSX.Element;
	rules?: string[];
	children?: IFormItem[];
}

export const getFormItem = (
	name: string,
	label: string,
	component: JSX.Element,
	rules?: string[],
	children?: IFormItem[]
): IFormItem => {
	return { name, label, component, rules, children };
};

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
	// 	{ name: "xxx", label: "xxx", component: <></>
	// ,children: [{{ name: "xxx", label: "xxx", component: <></>}],condition },
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
				const formList = [];
				formList.push(
					<Form.Item
						name={item.name}
						label={item.label}
						key={idx}>
						{item.component}
					</Form.Item>
				);
				// if (item.children) {
				// 	formList.push(
				// 		item.children.map((i: any) => {
				// 			return (
				// 				<Form.Item
				// 					noStyle
				// 					shouldUpdate={(
				// 						prevValues,
				// 						currentValues
				// 					) =>
				// 						prevValues[item.name] !==
				// 						currentValues[item.name]
				// 					}>
				// 					{({ getFieldValue }) =>
				// 						item.condition(
				// 							getFieldValue(item.name)
				// 						) ? (
				// 							<Form.Item
				// 								name={i.name}
				// 								label={i.label}>
				// 								{i.component}
				// 							</Form.Item>
				// 						) : null
				// 					}
				// 				</Form.Item>
				// 			);
				// 		})
				// 	);
				// }
				return formList;
			})}
		</Form>
	);
}
