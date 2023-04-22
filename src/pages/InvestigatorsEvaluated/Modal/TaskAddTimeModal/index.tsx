import { updateIEInfoTimeData } from "@/api/ie";
import { IEInfo } from "@/entity/IE/IEInfo";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Space } from "antd";
import { InputNumber } from "antd/lib";
import { useState } from "react";

const TaskAddTimeModal = (props: {
	open: boolean;
	setOpen: any;
	time: number;
	wtbh: string;
	tableUpdate: boolean;
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
	const [newTime, setNewTime] = useState(time);
	const onChange = (value: number | null) => {
		if (value != null) {
			setNewTime(value);
		}
	};

	const { loading, run } = useRequest(
		(info) => updateIEInfoTimeData(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					gMsg.onSuccess(`修改时间为${newTime}天`);
					setTableUpdate(!tableUpdate);
				} else {
					gMsg.onError(data.message);
				}
			},
			onFinally: () => {
				setOpen(false);
			},
			manual: true,
			debounceWait: 150,
		}
	);

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<Space style={{ width: "50%" }}>
						<a>请输入新的调查期限:</a>
						<InputNumber
							defaultValue={time}
							min={1}
							onChange={onChange}
						/>
						<a>天</a>
					</Space>
				}
				open={open}
				setOpen={setOpen}
				onOk={() => {
					const time = newTime;
					const info: IEInfo = {
						wtbh,
						finish: time,
					} as IEInfo;

					run(info);
				}}
				confirmLoading={loading}
			/>
		</>
	);
};

export default TaskAddTimeModal;
