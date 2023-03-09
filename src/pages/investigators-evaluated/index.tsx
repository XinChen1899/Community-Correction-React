import { Space } from "antd";

import "react";
import { useEffect, useState } from "react";
import TaskForm, { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskInfoModal from "@/pages/investigators-evaluated/TaskInfoModal";
import TaskOperatorForm from "@/pages/investigators-evaluated/TaskOperatorForm";

/**
 * 调查评估:
 * 功能:
 * 1.新增调查评估任务。
 * 2.查询显示所有调查评估任务记录。 TaskTable
 * 3.（县级）向委托方确认收到，接受或退回，通知监督方，向司法所指派任务；（所级）确认收到任务。
 * 4.《评估意见书》编辑、提交委托方、抄送检察院。
 * 5. 查看流程节点记录。
 */


export default function Hello() {

	const [, forceUpdate] = useState({});
	// 任务信息是否显示
	const [open, setOpen] = useState(false);

	const [selectTask, setSelectTask] = useState<DataType>({
		isFinished: false,
		id: "0",
		name: "null",
		age: 0,
		sex: "",
		tags: []
	});


	// To disable submit button at the beginning.
	useEffect(() => {
		forceUpdate({});
	}, []);
	// 表单提交后执行


	// 打开对话框
	const showModal = () => {
		setOpen(true);
	};


	return (
		<div>
			<div>
				<Space
					direction="vertical"
					size="middle"
					style={{ display: "flex" }}
				>
					<h2>调查评估</h2>
					{/* 操作区 */}
					<div style={{ padding: "0px 15px" }}>
						<TaskOperatorForm />
					</div>

					{/* 显示调查报告的列表 */}
					<TaskForm showModal={showModal} setSelectTask={setSelectTask} />

				</Space>
				{/* 显示详情 */}
				<TaskInfoModal open={open} setOpen={setOpen} selectTask={selectTask} />
			</div>
		</div>
	);
}
