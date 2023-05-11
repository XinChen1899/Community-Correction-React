import TemplateForm, { getFormItem } from "@/template/Form";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import "react";

export default function ModifyForm(props: {
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
				getFormItem(
					"dxbh",
					"社区矫正对象编号",
					<Input disabled />,
					true
				),
				getFormItem("xm", "姓名", <Input disabled />, true),
				getFormItem(
					"",
					"计分",
					<Input.Group compact>
						<Form.Item name="reason">
							<Input
								placeholder="请输入理由"
								name="xxx"
							/>
						</Form.Item>
						<Form.Item name="select">
							<Select
								placeholder="选择加分/扣分"
								style={{ width: 200 }}>
								<Select.Option value={"01"}>
									加分
								</Select.Option>
								<Select.Option value={"02"}>
									扣分
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item name="score">
							<InputNumber min={1} max={100} />
						</Form.Item>
					</Input.Group>,
				),
				getFormItem(
					"date",
					"计分日期",
					<DatePicker format="YYYY-MM-DD HH:mm:ss" />,
					true
				),
			]}
		/>
	);
}
