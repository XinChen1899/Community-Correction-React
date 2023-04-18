import { GMessage } from "@/utils/msg/GMsg";
import TemplateModal from "@/template/Modal";
import { Space, Input, InputRef } from "antd";
import { useRef } from "react";
import { updateIEInfoTimeData } from "@/api/ie";
import { IEInfo } from "@/entity/IE/IEInfo";

const TaskAddTimeModal = (props: {
	open: boolean;
	setOpen: any;
	time: number;
	wtbh: string;
	tableUpdate: any;
	setTableUpdate: any;
	gMsg: GMessage;
}) => {
	const {
		open,
		setOpen,
		time,
		gMsg,
		wtbh,
		tableUpdate,
		setTableUpdate,
	} = props;
	const timeRef = useRef<InputRef>(null);

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<Space.Compact style={{ width: "100%" }}>
						<Input ref={timeRef} defaultValue={time} />
					</Space.Compact>
				}
				open={open}
				setOpen={setOpen}
				getAPI={undefined}
				recordId={undefined}
				onOk={() => {
					const time = timeRef.current?.input?.value;
					const info: IEInfo = {
						wtbh,
						finish: time ? Number.parseInt(time) : -1,
						wtdw: "",
						wtdch: "",
						bdcpgrdlx: "",
						bgrxm: "",
						bgrsfzh: "",
						bgrxb: "",
						bgrcsrq: "",
						bgrjzddz: "",
						bgrgzdw: "",
						zm: "",
						ypxq: "",
						ypxqksrq: "",
						ypxqjsrq: "",
						ypxf: "",
						fjx: "",
						pjjg: "",
						pjrq: "",
						nsyjzlb: "",
						dcdwxqj: "",
					};
					updateIEInfoTimeData(
						info,
						() => {
							gMsg.onSuccess(
								`修改时间为${timeRef.current?.input?.value}`
							);
							setTableUpdate(!tableUpdate);
						},
						() => {
							gMsg.onError("修改失败!");
						}
					);
					setOpen(false);
				}}
			/>
		</>
	);
};

export default TaskAddTimeModal;
