import { Card, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DataType } from "@/pages/investigators-evaluated/Table";
import { IEInfo } from "@/entity/IE/IEInfo";
import { Space } from "antd/lib";
import axios from "axios";
import { IEInfo2 } from "@/entity/IE/IEInfo2";
import dayjs from "dayjs";
import { getById, updateIEInfoData } from "@/api/ie";
import { getDate, IeFormConvert2IeInfo } from "@/coderepo/ie";
import { IEInfoForm } from "@/pages/investigators-evaluated/Form/IEInfoForm";
import { GMessage } from "@/coderepo/msg/GMsg";

interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	taskUpdate: any;
	setTaskUpdate: any;
	gMsg: GMessage;
}

export default function TaskModifyModal(props: ITaskInfoModal) {
	const {
		open,
		setOpen,
		selectTask,
		setTableUpdate,
		tableUpdate,
		taskUpdate,
		setTaskUpdate,
		gMsg,
	} = props;

	const { wtbh } = selectTask;

	const tempIeInfo: IEInfo2 = {
		bdcpgrdlx: "",
		bgrcsrq: dayjs(),
		bgrgzdw: "",
		bgrjzddz: "",
		bgrsfzh: "",
		bgrxb: "",
		dcdwxqj: "",
		dcpgyj: "",
		dcpgyjs: "",
		dcyjshr: "",
		fjx: "",
		nsyjzlb: "",
		pjjg: "",
		pjrq: dayjs(),
		wtdch: "",
		wtdw: "",
		ypxf: "",
		ypxq: "",
		ypxqjsrq: dayjs(),
		ypxqksrq: dayjs(),
		zm: "",
		wtbh: selectTask.wtbh,
		bgrxm: selectTask.name,
	};

	const [ieInfo, setIeInfo] = useState<IEInfo2>(tempIeInfo);
	const [confirmLoading, setConfirmLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			// const result = await axios.get(
			// 	`http://localhost:9006/ie/${wtbh}`
			// );
			const result = await getById(wtbh);
			const data: IEInfo2 = result;
			data.bgrcsrq = dayjs(result.bgrcsrq);
			data.ypxqjsrq = dayjs(result.ypxqjsrq);
			data.ypxqksrq = dayjs(result.ypxqksrq);
			data.pjrq = dayjs(result.pjrq);
			setIeInfo(data);
		};
		fetchData();
	}, [wtbh, taskUpdate]);

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(ieInfo);
	});

	const onFinish = async (values: any) => {
		const info = IeFormConvert2IeInfo(values);
		selectTask.name = info.bgrxm;
		await updateIEInfoData(info);
		setTableUpdate(!tableUpdate);
		setTaskUpdate(!taskUpdate);
		gMsg.onSuccess("修改成功!");
	};

	const handleOk = () => {
		form.submit();
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 1000);
	};
	// 点击对话框的取消按钮
	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectTask.name + "的调查评估信息"}
			onOk={handleOk}
			onCancel={handleCancel}
			confirmLoading={confirmLoading}>
			<Space direction={"vertical"}>
				<Card
					title={"调查评估信息表"}
					style={{ width: "900px" }}>
					<IEInfoForm
						form={form}
						onFinish={onFinish}
						initialValues={ieInfo}
					/>
				</Card>
			</Space>
		</Modal>
	);
}
