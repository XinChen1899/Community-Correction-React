import { Button, Space } from "antd";

import "react";
import { useState } from "react";
import TaskForm, {
	DataType,
} from "@/pages/investigators-evaluated/Table";
import TaskOperatorForm from "@/pages/investigators-evaluated/TaskOperatorForm";
import useRequest from "@/api";
import { message } from "antd";

/**
 * 调查评估:
 * 功能:
 * 1.新增调查评估任务。
 * 2.查询显示所有调查评估任务记录。
 * 3.查看流程节点记录。
 */

export default function IE() {
	const [selectTask, setSelectTask] = useState<DataType>({
		isFinished: false,
		wtbh: "00000000",
		name: "null",
	});
	// 是否需要更新表格
	const [tableUpdate, setTableUpdate] = useState(false);
	// api测试
	const result = useRequest("/ie/test", "get");

	const [messageApi, contextHolder] = message.useMessage();

	const successMsg = (msg: string) => {
		messageApi.open({
			type: "success",
			content: msg,
		});
	};

	const errorMsg = (msg: string) => {
		messageApi.open({
			type: "error",
			content: msg,
		});
	};

	return (
		<div>
			{contextHolder}
			<Space
				direction="vertical"
				size="middle"
				style={{ display: "flex" }}>
				<h2>调查评估 Test: {result.result}</h2>
				{/* 操作区 */}
				<div style={{ padding: "0px 15px" }}>
					<TaskOperatorForm
						tableUpdate={tableUpdate}
						setTableUpdate={setTableUpdate}
						gMsg={{
							onSuccess: successMsg,
							onError: errorMsg,
						}}
					/>
				</div>

				{/* 显示调查报告的列表 */}
				<TaskForm
					selectTask={selectTask}
					setSelectTask={setSelectTask}
					tableUpdate={tableUpdate}
					setTableUpdate={setTableUpdate}
					gMsg={{
						onSuccess: successMsg,
						onError: errorMsg,
					}}
				/>
			</Space>
		</div>
	);
}
