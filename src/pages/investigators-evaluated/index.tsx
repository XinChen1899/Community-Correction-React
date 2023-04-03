import { Space } from "antd";

import "react";
import { useEffect, useState } from "react";
import TaskForm, { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskOperatorForm from "@/pages/investigators-evaluated/TaskOperatorForm";
import useRequest from "@/api";

/**
 * 调查评估:
 * 功能:
 * 1.新增调查评估任务。
 * 2.查询显示所有调查评估任务记录。 TaskTable
 * 3.（县级）向委托方确认收到，接受或退回，通知监督方，向司法所指派任务；（所级）确认收到任务。
 * 4.《评估意见书》编辑、提交委托方、抄送检察院。
 * 5. 查看流程节点记录。
 */


export default function IE() {

	const [, forceUpdate] = useState({});
	const [selectTask, setSelectTask] = useState<DataType>({
		isFinished: false,
		wtbh: "0",
		name: "null"
	});

	const [tableUpdate, setTableUpdate] = useState(false);


	// To disable submit button at the beginning.
	useEffect(() => {
		forceUpdate({});
	}, []);
	// 表单提交后执行

	const result = useRequest("/ie/test", "get");
	return (
		<div>
			<div>
				<Space
					direction="vertical"
					size="middle"
					style={{ display: "flex" }}
				>
					<h2>调查评估</h2>
					<h2>
						{result.result}
					</h2>
					{/* 操作区 */}
					<div style={{ padding: "0px 15px" }}>
						<TaskOperatorForm tableUpdate={tableUpdate} setTableUpdate={setTableUpdate} />
					</div>

					{/* 显示调查报告的列表 */}
					<TaskForm selectTask={selectTask} setSelectTask={setSelectTask}
							  tableUpdate={tableUpdate}
							  setTableUpdate={setTableUpdate}
					/>

				</Space>

			</div>
		</div>
	);
}
