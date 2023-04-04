import { Button, Card, Modal, Row, Space, Steps } from "antd";
import {
	CheckCircleOutlined,
	LoadingOutlined,
	UserOutlined
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
	DataType
} from "@/pages/investigators-evaluated/Table";
import TaskInfo
	from "@/pages/investigators-evaluated/Modal/TaskInfoModal/TaskInfo";
import axios from "axios";
import { IEInfo } from "@/entity/IE/IEInfo";


interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
	taskUpdate: boolean;
}


export default function TaskInfoModal(props: ITaskInfoModal) {
	const { open, setOpen, selectTask, taskUpdate } = props;
	const wtbh = selectTask.wtbh;
	const [info, setInfo] = useState<IEInfo>();
	const temp: IEInfo = {
		bdcpgrdlx: "",
		bgrcsrq: "",
		bgrgzdw: "",
		bgrjzddz: "",
		bgrsfzh: "",
		bgrxb: "",
		bgrxm: "xxx",
		dcdwxqj: "",
		dcpgyj: "",
		dcpgyjs: "",
		dcyjshr: "",
		fjx: "",
		nsyjzlb: "",
		pjjg: "",
		pjrq: "",
		wtbh: "",
		wtdch: "",
		wtdw: "",
		ypxf: "",
		ypxq: "",
		ypxqjsrq: "",
		ypxqksrq: "",
		zm: ""

	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`http://localhost:9006/ie/${wtbh}`);
			setInfo(result.data);
		};
		fetchData();
	}, [wtbh, taskUpdate]);

	const handleOk = () => {
		setOpen(false);
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
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Card>
				<Space direction={"vertical"}>
					<Card hoverable style={{ width: "900px" }}>
						<TaskInfo
							info={info === undefined ? temp : info} />
					</Card>

					<Card
						title="调查报告流程"
						hoverable
						style={{ width: "900px" }}
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
				</Space>

			</Card>
		</Modal>
	);
}