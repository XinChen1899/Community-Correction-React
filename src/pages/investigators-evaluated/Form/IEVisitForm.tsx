import "react";
import { DatePicker, Form, Input } from "antd";
import React from "react";

export function IeVisitForm(props: {
	form: any, onFinish: any, initialValues: any
}) {
	const { form, onFinish, initialValues } = props;

	return (
		<Form
			form={form}
			initialValues={initialValues}
			onFinish={onFinish}
		>
			<Form.Item name={"bdcrxm"}
					   label="被调查人姓名">
				<Input placeholder={"请输入姓名"} />
			</Form.Item>
			<Form.Item name={"ybgrgx"}
					   label="与被调查评估对象关系">
				<Input
					placeholder={"与被调查评估对象关系"} />
			</Form.Item>
			<Form.Item name={"dcsx"} label="调查事项">
				<Input placeholder={"调查事项"} />
			</Form.Item>
			<Form.Item name={"dcsj"} label="调查时间">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"dcdd"} label="调查地点">
				<Input placeholder={"调查地点"} />
			</Form.Item>
			<Form.Item name={"dcdwsfs"} label="调查单位">
				<Input placeholder={"调查单位"} />
			</Form.Item>
			<Form.Item name={"dcr"} label="调查人">
				<Input placeholder={"调查人"} />
			</Form.Item>
		</Form>
	);
};