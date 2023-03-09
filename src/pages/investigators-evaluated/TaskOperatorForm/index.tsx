import React, { MutableRefObject, useRef, useState } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import { data } from "@/pages/investigators-evaluated/TaskTable";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import TaskAddModal from "@/pages/investigators-evaluated/TaskOperatorForm/TaskAddModal";

/*
* 调查评估任务表的操作表单
* 1. 查询任务
* 2. 新增调查评估
* */

interface ITaskOperatorForm {

}

export default function TaskOperatorForm(props: ITaskOperatorForm) {
	const [form] = Form.useForm();

	const [addModalOpen, setAddModalOpen] = useState(false);

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
		<>
			<TaskAddModal open={addModalOpen} setOpen={setAddModalOpen} />
			<Card title={"调查评估查询"} extra={<>
				<Button onClick={() => setAddModalOpen(true)} type={"primary"} icon={<PlusOutlined />}>
					新增调查评估
				</Button>
			</>}>
				<Form
					form={form}
					name="search"
					layout="inline"
					onFinish={onFinish}
				>
					<Form.Item
						label={"关键字"}
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
										icon={<SearchOutlined />}
										onClick={searchByName}
									/>
								</Space>
							</>
						)}
					</Form.Item>
				</Form>
			</Card>
		</>
	);
}