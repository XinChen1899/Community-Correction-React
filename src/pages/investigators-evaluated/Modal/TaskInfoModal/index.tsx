import { Button, Card, Modal, Row, Steps } from "antd";
import { CheckCircleOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskInfo from "@/pages/investigators-evaluated/Modal/TaskInfoModal/TaskInfo";
import { IEInfo } from "@/entity/IE/IEInfo";


interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
}

export default function TaskInfoModal(props: ITaskInfoModal) {
	const { open, setOpen, selectTask } = props;
	const wtbh = selectTask.WTBH;

	// todo 根据wtbh获取到IEInfo信息
	let info: IEInfo = {
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
		WTBH: wtbh,
		BGRXM: selectTask.name
	};

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
			title={selectTask.name + "的调查评估信息"}
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
						<TaskInfo info={info} />
					</Card>
				</Row>

				<Row>
					<Card
						title="调查报告流程"
						hoverable
						style={{ width: "950px" }}
					>
						<Steps
							items={[
								{
									title: "接受委托",
									status: "finish",
									icon: <UserOutlined />,
									description: "2023/1/1日接受委托"
								},
								{
									title: "调查评估",
									status: "finish",
									icon: <LoadingOutlined />,
									description: "还需x个工作日"
								},
								{
									title: "结束",
									status: "process",
									icon: <CheckCircleOutlined />
								}
							]}
						/>
					</Card>
				</Row>
			</Card>
		</Modal>
	);
}