import { Button, Card, Modal, Row, Steps } from "antd";
import { CheckCircleOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskInfo from "@/pages/investigators-evaluated/Modal/TaskVisitInfoModal/TaskInfo";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";

interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
}

export default function TaskVisitInfoModal(props: {
	open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	selectTask: DataType
}) {
	const { open, setOpen, selectTask } = props;
	// todo 发起api请求获取调查评估走访信息（根据委托编号）
	const info: IEVisitInfo = {
		BDCRXM: selectTask.name,
		DCDD: "",
		DCDWSFS: "",
		DCR: "谢毓佺",
		DCSJ: "",
		DCSX: "",
		WTBH: selectTask.WTBH,
		YBGRGX: "",
		id: 0

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