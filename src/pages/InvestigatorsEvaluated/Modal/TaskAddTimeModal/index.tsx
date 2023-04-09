import { GMessage } from "@/coderepo/msg/GMsg";
import TemplateModal from "@/template/Modal";
import { Space, Input, InputRef } from "antd";
import { useRef } from "react";

const TaskAddTimeModal = (props: {
	open: boolean;
	setOpen: any;
	time: number;
	gMsg: GMessage;
}) => {
	const { open, setOpen, time, gMsg } = props;
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
					gMsg.onSuccess(
						`修改时间为${timeRef.current?.input?.value}`
					);
				}}
			/>
		</>
	);
};

export default TaskAddTimeModal;
