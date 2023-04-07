import { Button, Card, Modal, Row, Space, Steps } from "antd";
import {
	CheckCircleOutlined,
	LoadingOutlined,
	UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import TaskInfo from "@/pages/investigators-evaluated/Modal/TaskInfoModal/TaskInfo";

import { IEInfo } from "@/entity/IE/IEInfo";
import { getIEInfoById } from "@/api/ie";
import { GMessage } from "@/coderepo/msg/GMsg";
import { DataType } from "../..";
import TemplateModal from "@/template/Modal";

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

	// useEffect(() => {
	// 	if (wtbh != undefined && wtbh != "" && wtbh) {
	// 		getIEInfoById(wtbh, setInfo, () =>
	// 			gMsg.onError("找不到信息对象!")
	// 		);

	// 		console.log(info);
	// 	}
	// }, [wtbh, taskUpdate]);

	return (
		<>
			<TemplateModal
				InfoDescriptions={<TaskInfo info={info} />}
				open={open}
				setOpen={setOpen}
				recordId={wtbh}
				infoUpdate={taskUpdate}
				getAPI={(id: any) => {
					getIEInfoById(id, setInfo, () =>
						gMsg.onError("找不到此对象!")
					);
					console.log(info);
				}}
			/>
		</>
	);
}
