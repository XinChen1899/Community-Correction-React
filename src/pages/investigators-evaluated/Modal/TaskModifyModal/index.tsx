import { Card, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { DataType } from "@/pages/investigators-evaluated/Table";
import { Space } from "antd/lib";
import { getIEInfoById, updateIEInfoData } from "@/api/ie";
import { IeFormConvert2IeInfo } from "@/coderepo/ie";
import { IEInfoForm } from "@/pages/investigators-evaluated/Form/IEInfoForm";
import { GMessage } from "@/coderepo/msg/GMsg";
import { IEInfo } from "@/entity/IE/IEInfo";
import dayjs from "dayjs";

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

	const tempIeInfo: IEInfo = {
		bdcpgrdlx: "",
		bgrcsrq: "",
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
		pjrq: "",
		wtdch: "",
		wtdw: "",
		ypxf: "",
		ypxq: "",
		ypxqjsrq: "",
		ypxqksrq: "",
		zm: "",
		wtbh: "",
		bgrxm: selectTask.name,
	};

	const [ieInfo, setIeInfo] = useState<IEInfo>(tempIeInfo);
	const [confirmLoading, setConfirmLoading] = useState(false);

	useEffect(() => {
		if (wtbh != undefined && wtbh != "" && wtbh) {
			getIEInfoById(
				wtbh,
				(info: IEInfo) => {
					info.pjrq = dayjs(info.pjrq);
					info.bgrcsrq = dayjs(info.bgrcsrq);
					info.ypxqjsrq = dayjs(info.ypxqjsrq);
					info.ypxqksrq = dayjs(info.ypxqksrq);
					setIeInfo(info);
				},
				() => gMsg.onError("找不到此更新对象!")
			);

			console.log(ieInfo);
		}
	}, [wtbh, taskUpdate]);

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(ieInfo);
	});

	const onFinish = (values: any) => {
		const info = IeFormConvert2IeInfo(values);
		console.log(info);

		selectTask.name = info.bgrxm;
		updateIEInfoData(
			info,
			() => {
				gMsg.onSuccess("修改成功！");
				setTableUpdate(!tableUpdate);
				setTaskUpdate(!taskUpdate);
			},
			(msg: string) => {
				gMsg.onError("修改失败！" + msg);
			}
		);
	};

	const handleOk = () => {
		form.submit();
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 500);
	};

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectTask.name + "的调查评估信息"}
			onOk={handleOk}
			onCancel={() => setOpen(false)}
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
