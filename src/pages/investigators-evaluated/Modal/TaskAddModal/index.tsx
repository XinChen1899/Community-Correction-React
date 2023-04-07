import { useEffect, useState } from "react";
import { Card, Form, Modal } from "antd";

import "@/entity/IE/IEInfo";
import { saveIEInfoData } from "@/api/ie";
import { IEInfoForm } from "@/pages/investigators-evaluated/Form/IEInfoForm";
import { IeFormConvert2IeInfo } from "@/coderepo/ie";
import { GMessage } from "@/coderepo/msg/GMsg";

const TaskAddModal = (props: {
	open: boolean;
	setOpen: any;
	tableUpdate: boolean;
	setTableUpdate: any;
	tableCount: number;
	gMsg: GMessage;
}) => {
	const {
		setOpen,
		open,
		setTableUpdate,
		tableUpdate,
		tableCount,
		gMsg,
	} = props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();
	const [wtbh, setWTBH] = useState("");

	const handleOk = () => {
		setConfirmLoading(true);
		form.submit();
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 1000);
	};
	const getWTBH = (ieInfoCounts: number) => {
		const s = ieInfoCounts.toString();
		const len = 8 - s.length;
		return "0".repeat(len) + s;
	};
	useEffect(() => {
		form.resetFields();
		setWTBH(getWTBH(tableCount + 1));
	}, [tableUpdate]);

	// 提交表单时操作
	// 新增调查评估时，同时新增调查评估信息
	const onFinish = async (values: any) => {
		const tempInfo = IeFormConvert2IeInfo(values);
		saveIEInfoData(
			tempInfo,
			() => {
				gMsg.onSuccess("新增调查评估!");
				setTableUpdate(!tableUpdate);
			},
			(msg: string) => {
				gMsg.onError("登记失败！" + msg);
			}
		);
	};

	return (
		<Modal
			width={1000}
			open={open}
			onCancel={() => setOpen(false)}
			confirmLoading={confirmLoading}
			onOk={handleOk}>
			<Card title={"调查评估信息表"}>
				<IEInfoForm
					form={form}
					onFinish={onFinish}
					initialValues={{
						wtbh: wtbh,
						bdcpgrdlx: "01",
						bgrxb: "male",
						zm: "01",
						ypxf: "01",
						fjx: "99",
						pjjg: "01",
						nsyjzlb: "02",
					}}
				/>
			</Card>
		</Modal>
	);
};

export default TaskAddModal;
