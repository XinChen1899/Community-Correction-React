import { Card, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { Space } from "antd/lib";
import { GMessage } from "@/coderepo/msg/GMsg";
import { DataType } from "../..";
import { RegisterForm } from "../../Form/RegisterForm";
import { CorrectionPeople } from "@/entity/IC/Crp";

export default function CrpModifyModal(props: {
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
		form.resetFields();
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

	const info: CorrectionPeople = {
		sqjzdxbh: "",
		sfdcpg: false,
		jzlb: "",
		xm: selectRecord.name,
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
	};

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectRecord.name + "的基本信息"}
			onOk={handleOk}
			onCancel={() => setOpen(false)}
			confirmLoading={confirmLoading}>
			<Space direction={"vertical"}>
				<Card
					title={"社区矫正对象信息表"}
					style={{ width: "900px" }}>
					<RegisterForm
						form={form}
						onFinish={onFinish}
						initialValues={info}
					/>
				</Card>
			</Space>
		</Modal>
	);
}
