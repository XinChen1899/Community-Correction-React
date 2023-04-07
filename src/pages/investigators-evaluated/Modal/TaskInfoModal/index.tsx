import { Button, Card, Modal, Row, Space, Steps } from "antd";
import {
	CheckCircleOutlined,
	LoadingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DataType } from "@/pages/investigators-evaluated/Table";
import TaskInfo from "@/pages/investigators-evaluated/Modal/TaskInfoModal/TaskInfo";

import { IEInfo } from "@/entity/IE/IEInfo";
import { getIEInfoById } from "@/api/ie";
import { GMessage } from "@/coderepo/msg/GMsg";

interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
	taskUpdate: boolean;
	gMsg: GMessage;
}
const defaultIEInfo: IEInfo = {
	bdcpgrdlx: "",
	bgrcsrq: "",
	bgrgzdw: "",
	bgrjzddz: "",
	bgrsfzh: "",
	bgrxb: "",
	bgrxm: "",
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
	zm: "",
};

export default function TaskInfoModal(props: ITaskInfoModal) {
	const { open, setOpen, selectTask, taskUpdate, gMsg } = props;
	const { wtbh } = selectTask;
	const [info, setInfo] = useState<IEInfo>(defaultIEInfo);

	useEffect(() => {
		if (wtbh != undefined && wtbh != "" && wtbh) {
			getIEInfoById(wtbh, setInfo, () =>
				gMsg.onError("找不到信息对象!")
			);

			console.log(info);
		}
	}, [wtbh, taskUpdate]);

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			onOk={() => setOpen(false)}
			onCancel={() => setOpen(false)}>
			<Card>
				<Space direction={"vertical"}>
					<Card hoverable style={{ width: "900px" }}>
						<TaskInfo info={info} />
					</Card>

					<Card
						title="调查报告流程"
						hoverable
						style={{ width: "900px" }}>
						<Steps
							items={[
								{
									title: "接受委托",
									status: "finish",
									icon: <UserOutlined />,
									description: "2023/1/1日接受委托",
								},
								{
									title: "调查评估",
									status: "finish",
									icon: <LoadingOutlined />,
									description: "还需x个工作日",
								},
								{
									title: "结束",
									status: "process",
									icon: <CheckCircleOutlined />,
								},
							]}
						/>
					</Card>
				</Space>
			</Card>
		</Modal>
	);
}
