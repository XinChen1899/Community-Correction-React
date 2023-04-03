import { Button, Card, Modal } from "antd";
import React from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskInfo from "@/pages/investigators-evaluated/Modal/TaskVisitInfoModal/TaskInfo";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";


export default function TaskVisitInfoModal(props: {
	open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	selectTask: DataType, taskUpdate: boolean
}) {
	const { open, setOpen, selectTask, taskUpdate } = props;
	// todo 发起api请求获取调查评估走访信息（根据委托编号）
	const info: IEVisitInfo = {
		bdcrxm: selectTask.name,
		dcdd: "",
		dcdwsfs: "",
		dcr: "谢毓佺",
		dcsj: "",
		dcsx: "",
		wtbh: selectTask.wtbh,
		ybgrgx: ""
	};

	const handleOk = () => {

	};
	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={selectTask.name + "的调查走访信息"}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					返回
				</Button>
			]}
		>
			<Card>
				<TaskInfo info={info} />
			</Card>
		</Modal>
	);
}