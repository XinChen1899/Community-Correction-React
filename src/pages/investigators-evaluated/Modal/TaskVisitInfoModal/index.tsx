import { Button, Card, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import TaskInfo
	from "@/pages/investigators-evaluated/Modal/TaskVisitInfoModal/TaskInfo";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";
import { IEInfo } from "@/entity/IE/IEInfo";
import axios from "axios";


export default function TaskVisitInfoModal(props: {
	open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>,
	selectTask: DataType, taskUpdate: boolean
}) {
	const { open, setOpen, selectTask, taskUpdate } = props;

	const tempInfo: IEVisitInfo = {
		bdcrxm: selectTask.name,
		dcdd: "",
		dcdwsfs: "",
		dcr: "谢毓佺",
		dcsj: "",
		dcsx: "",
		wtbh: selectTask.wtbh,
		ybgrgx: ""
	};
	const [info, setInfo] = useState<IEVisitInfo>(tempInfo);
	const handleOk = () => {
	};
	const handleCancel = () => {
		setOpen(false);
	};
	
	const { wtbh } = selectTask;
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`http://localhost:9006/ie/vis/${wtbh}`);
			setInfo(result.data);
		};
		fetchData();
	}, [wtbh, taskUpdate]);

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={selectTask.name + "的调查走访信息"}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Card>
				<TaskInfo info={info} />
			</Card>
		</Modal>
	);
}