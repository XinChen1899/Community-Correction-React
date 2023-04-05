import "react";
import { DatePicker, Form, Input, Select } from "antd";
import { useState } from "react";
import { generateSelect, jzlbMap } from "@/coderepo";

export function ReceiveForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
}) {
	const { form, onFinish, initialValues } = props;
	const [loading, setLoading] = useState(false);

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"sqjzdxbh"} label={"社区矫正对象编号"}>
				<Input placeholder={"请输入社区矫正对象编号"} />
			</Form.Item>
			<Form.Item name={"jzlb"} label="矫正类别">
				{generateSelect(jzlbMap)}
			</Form.Item>
			<Form.Item name={"xm"} label="姓名">
				<Input placeholder={"请输入姓名"} />
			</Form.Item>
			<Form.Item name={"xb"} label="性别">
				<Select style={{ width: 120 }}>
					<Select.Option value="male">男</Select.Option>
					<Select.Option value="female">女</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name={"sfzhm"} label="身份证号码">
				<Input
					placeholder={"请输入身份证号码"}
					maxLength={18}
				/>
			</Form.Item>
			<Form.Item name={"csrq"} label="出生日期">
				<DatePicker />
			</Form.Item>

			<Form.Item name={"grlxdh"} label="个人联系电话">
				<Input placeholder="请输入个人联系电话" />
			</Form.Item>
			<Form.Item name={"xgrq"} label="宣告日期">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"jzxz"} label="矫正小组">
				<Select style={{ width: 120 }}>
					<Select.Option value="male">男</Select.Option>
					<Select.Option value="female">女</Select.Option>
				</Select>
			</Form.Item>
		</Form>
	);
}
