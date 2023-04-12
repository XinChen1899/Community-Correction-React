import { Card, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { Space } from "antd/lib";
import { GMessage } from "@/utils/msg/GMsg";
import { DataType } from "../..";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { ReceiveForm } from "../../Form/ReceiveForm";
import TemplateModal from "@/template/Modal";

export default function CrpRecModal(props: {
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
			gMsg.onSuccess("接收入矫！");
		}, 1000);
	};
	// 点击对话框的取消按钮
	const handleCancel = () => {
		setOpen(false);
	};

	const info: CorrectionPeople = {
		sqjzdxbh: "",
		sfdcpg: false,
		jzlb: "",
		xm: selectRecord.xm,
		xb: "",
		mz: "",
		gj: "",
		hjlx: "",
		sfzhm: "",
		csrq: "",
		whcd: "",
		hyzk: "",
		jyjxqk: "",
		xzzmm: "",
		xgzdw: "",
		dwlxdh: "",
		grlxdh: "",
		ywjtcyjzyshgx: "",
		zp: "",
		team: "",
		status: "",
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<Card
						title={"接收入矫"}
						style={{ width: "900px" }}>
						<ReceiveForm
							form={form}
							onFinish={onFinish}
							initialValues={info}
						/>
					</Card>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				getAPI={undefined}
				recordId={undefined}
				confirmLoading={confirmLoading}
			/>
		</>
	);
}
