import { useState } from "react";
import TaskInfo from "@/pages/InvestigatorsEvaluated/Modal/TaskInfoModal/TaskInfo";

import { IEInfo } from "@/entity/IE/IEInfo";
import { getIEInfoById } from "@/api/ie";
import { GMessage } from "@/coderepo/msg/GMsg";
import TemplateModal from "@/template/Modal";

interface ITaskInfoModal {
	open: boolean;
	setOpen: any;
	wtbh: string;
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
	finish: 0,
};

export default function TaskInfoModal(props: ITaskInfoModal) {
	const { open, setOpen, wtbh, taskUpdate, gMsg } = props;
	const [info, setInfo] = useState<IEInfo>(defaultIEInfo);

	return (
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
	);
}
