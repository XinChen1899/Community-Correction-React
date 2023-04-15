import "react";
import TemplateForm from "@/template/Form";
import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Select,
	Space,
	Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

export default function ModifyForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;
	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"dxbh"} label={"社区矫正对象编号"}>
				<Input disabled />
			</Form.Item>
			<Form.Item name={"xm"} label="姓名">
				<Input disabled />
			</Form.Item>
			<Form.Item label="计分">
				<Input.Group compact>
					<Form.Item name="reason">
						<Input placeholder="请输入理由" name="xxx" />
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
				</Input.Group>
			</Form.Item>
			<Form.Item name={"date"} label="计分日期">
				<DatePicker format="YYYY-MM-DD HH:mm:ss" />
			</Form.Item>
		</Form>
	);
}
