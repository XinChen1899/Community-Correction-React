import { generateSelect, jllbMap } from "@/utils";
import { DatePicker, Form, Input } from "antd";
import "react";

export default function AddForm(props: {
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
				<Input />
			</Form.Item>
			<Form.Item label="奖励类别" name={"jllb"}>
				{generateSelect(jllbMap)}
			</Form.Item>
			<Form.Item label="奖励原因" name={"jlyy"}>
				<Input.TextArea />
			</Form.Item>
			<Form.Item name={"date"} label="奖励时间">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"jlr"} label="记录人">
				<Input />
			</Form.Item>
		</Form>
	);
}
