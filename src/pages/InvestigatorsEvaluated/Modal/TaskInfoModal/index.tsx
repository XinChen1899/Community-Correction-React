import TaskInfo from "@/pages/InvestigatorsEvaluated/Modal/TaskInfoModal/TaskInfo";

import { GMessage } from "@/utils/msg/GMsg";
import TemplateModal from "@/template/Modal";
import { Card, Steps } from "antd";

interface ITaskInfoModal {
	open: boolean;
	setOpen: any;
	info: any;
	taskUpdate: boolean;
	gMsg: GMessage;
	recv?: boolean;
}

export default function TaskInfoModal(props: ITaskInfoModal) {
	const { open, setOpen, info, taskUpdate, gMsg, recv } = props;

	let current = 1;
	if (!info || info.finish == -1 || recv) current = 1;
	else if (info.finish > 0) current = 2;
	else current = 3;

	return (
		<TemplateModal
			InfoDescriptions={<TaskInfo info={info} />}
			open={open}
			setOpen={setOpen}
			infoUpdate={taskUpdate}>
			<Card>
				<Steps
					current={current}
					items={[
						{
							title: "委托方发起调查评估委托",
						},
						{
							title: "社区矫正系统接收",
						},
						{
							title: "进行调查评估",
						},
						{
							title: "调查评估完成",
						},
					]}
				/>
			</Card>
		</TemplateModal>
	);
}
