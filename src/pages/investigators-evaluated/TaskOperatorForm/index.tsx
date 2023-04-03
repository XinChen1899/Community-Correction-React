import React, { useState } from "react";
import { Button, Card } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import TaskAddModal from "@/pages/investigators-evaluated/TaskOperatorForm/TaskAddModal";

/*
* 调查评估任务表的操作表单
* 1. 新增调查评估
* */


export default function TaskOperatorForm(props: { setTableUpdate: any }) {
	const [addModalOpen, setAddModalOpen] = useState(false);


	return (
		<>
			<TaskAddModal open={addModalOpen} setOpen={setAddModalOpen}
						  setTableUpdate={props.setTableUpdate} />
			<Card title={"调查评估查询"} extra={<>
				<Button onClick={() => setAddModalOpen(true)} type={"primary"} icon={<PlusOutlined />}>
					新增调查评估
				</Button>
			</>} />

		</>
	);
}