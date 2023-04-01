import { Button, Card, DatePicker, Input, Modal, Row, Steps } from "antd";
import { CheckCircleOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskInfo from "@/pages/investigators-evaluated/Modal/TaskModifyModal/TaskInfo";
import { IEInfo } from "@/entity/IE/IEInfo";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";

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

	// todo 根据WTBH获取IEInfo 和IEVisitInfo
	const ieInfo: IEInfo = {
		BDCPGRDLX: "",
		BGRCSRQ: "",
		BGRGZDW: "",
		BGRJZDDZ: "",
		BGRSFZH: "",
		BGRXB: "",
		DCDWXQJ: "",
		DCPGYJ: "",
		DCPGYJS: "",
		DCYJSHR: "",
		FJX: "",
		NSYJZLB: "",
		PJJG: "",
		PJRQ: "",
		WTDCH: "",
		WTDW: "",
		YPXF: "",
		YPXQ: "",
		YPXQJSRQ: "",
		YPXQKSRQ: "",
		ZM: "",
		id: 0,
		WTBH: selectTask.WTBH,
		BGRXM: selectTask.name
	};
	const ieVisitInfo: IEVisitInfo = {
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
				<TaskInfo ieInfo={ieInfo} ieVisitInfo={ieVisitInfo} />
			</Card>
		</Modal>
	);
}