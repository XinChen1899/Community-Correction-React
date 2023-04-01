import { Button, Card, DatePicker, Input, Modal, Row, Steps } from "antd";
import { CheckCircleOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskInfo from "@/pages/investigators-evaluated/Modal/TaskModifyModal/TaskInfo";

interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
}

export default function TaskModifyModal(props: ITaskInfoModal) {
	const { open, setOpen, selectTask } = props;
	const handleOk = () => {
	};
	// 点击对话框的取消按钮
	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectTask.name + "的调查评估信息"}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					返回
				</Button>
			]}
		>
			<Card>
				<Row>
					<Card>
						<TaskInfo selectTask={selectTask} />
					</Card>
				</Row>
			</Card>
		</Modal>
	);
}