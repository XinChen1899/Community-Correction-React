import React, { MutableRefObject, useRef } from "react";
import { Button, Form, Input, Space } from "antd";
import { data } from "@/pages/investigators-evaluated/TaskTable";

/*
* 调查评估任务表的操作表单
* 1. 查询任务
* 2. 新增调查评估
* */

interface ITaskOperatorForm {

}

export default function TaskOperatorForm(props: ITaskOperatorForm) {
	const [form] = Form.useForm();

	const inputName: MutableRefObject<any> = useRef(null);

	const onFinish = (values: any) => {
		console.log("Finish:", values);
	};

	const searchByName = () => {
		const name = inputName.current.input.value;
		data.map((item) => {
			if (item.name == name) {
				alert("find it " + item.name);
				// todo: 更新表格的显示
			}
		});
	};

	return (
		<Form
			form={form}
			name="search"
			layout="inline"
			onFinish={onFinish}
		>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: "请输入矫正对象姓名"
					}
				]}
			>
				<Input placeholder="请输入矫正对象姓名" ref={inputName} />
			</Form.Item>

			<Form.Item shouldUpdate>
				{() => (
					<>
						<Space>
							<Button
								type="primary"
								htmlType="submit"
								disabled={
									!form.isFieldsTouched(
										true
									) ||
									!!form
										.getFieldsError()
										.filter(
											({
												 errors
											 }) =>
												errors.length
										).length
								}

								onClick={searchByName}
							>
								查询
							</Button>

							<Button type="primary">
								新增调查评估
							</Button>
						</Space>
					</>
				)}
			</Form.Item>
		</Form>
	);
}