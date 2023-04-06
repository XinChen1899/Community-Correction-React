import { Card, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { Space } from "antd/lib";
import { GMessage } from "@/coderepo/msg/GMsg";
import { DataType } from "../..";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { CorrectionTeam } from "@/entity/IC/Cteam";
import { AddTeamForm } from "../../Form/AddTeamForm";

export default function TeamModifyModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
	gMsg: GMessage;
}) {
	const { open, setOpen, selectRecord, gMsg } = props;

	const [confirmLoading, setConfirmLoading] = useState(false);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const result = await axios.get(
	// 			`http://localhost:9006/ie/${wtbh}`
	// 		);
	// 		const temp: IEInfo = result.data;
	// 		const data: IEInfo2 = result.data;
	// 		data.bgrcsrq = dayjs(temp.bgrcsrq);
	// 		data.ypxqjsrq = dayjs(temp.ypxqjsrq);
	// 		data.ypxqksrq = dayjs(temp.ypxqksrq);
	// 		data.pjrq = dayjs(temp.pjrq);
	// 		setIeInfo(data);
	// 	};
	// 	fetchData();
	// }, [wtbh, taskUpdate]);

	const [form] = Form.useForm();

	useEffect(() => {
		// form.resetFields();
		// form.setFieldsValue(ieInfo);
	});

	const onFinish = async (values: any) => {
		// const info = IeFormConvert2IeInfo(values);
		// selectTask.name = info.bgrxm;
		// await updateIEInfoData(info);
		// setTableUpdate(!tableUpdate);
		// setTaskUpdate(!taskUpdate);
		// gMsg.onSuccess("修改成功!");
	};

	const handleOk = () => {
		form.submit();
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
			gMsg.onSuccess("修改成功！");
		}, 1000);
	};

	const info: CorrectionTeam = {
		id: selectRecord.id,
		teamName: selectRecord.teamName,
		monitorName: selectRecord.monitorName,
		teamNumber: selectRecord.teamNumber,
		workers: [],
	};

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectRecord.id + "的小组信息"}
			onOk={handleOk}
			onCancel={() => setOpen(false)}
			confirmLoading={confirmLoading}>
			<Space direction={"vertical"}>
				<Card
					title={"矫正小组信息表"}
					style={{ width: "900px" }}>
					<AddTeamForm
						form={form}
						onFinish={onFinish}
						initialValues={info}
					/>
				</Card>
			</Space>
		</Modal>
	);
}
