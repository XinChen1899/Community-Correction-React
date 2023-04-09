import { Card, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Space } from "antd/lib";
import { getIEInfoById, updateIEInfoData } from "@/api/ie";
import { IeFormConvert2IeInfo } from "@/coderepo/ie";
import { IEInfoForm } from "@/pages/InvestigatorsEvaluated/Form/IEInfoForm";
import { GMessage } from "@/coderepo/msg/GMsg";
import { IEInfo } from "@/entity/IE/IEInfo";
import dayjs from "dayjs";
import { DataType } from "../..";
import TemplateModal from "@/template/Modal";

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
const defaultIEInfo: IEInfo = {
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
	bgrxm: "",
	finish: -1,
};
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

	const [info, setInfo] = useState<IEInfo>(defaultIEInfo);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(info);
	});

	const onFinish = (values: any) => {
		const info = IeFormConvert2IeInfo(values);

		selectTask.name = info.bgrxm;
		updateIEInfoData(
			info,
			() => {
				gMsg.onSuccess("修改成功！");
				setTableUpdate(!tableUpdate);
				setTaskUpdate(!taskUpdate);
				setOpen(false);
				setConfirmLoading(false);
			},
			(msg: string) => {
				gMsg.onError("修改失败！" + msg);
			}
		);
	};

	const handleOk = () => {
		form.submit();
		setConfirmLoading(true);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<IEInfoForm
						form={form}
						onFinish={onFinish}
						initialValues={info}
					/>
				}
				open={open}
				setOpen={setOpen}
				recordId={wtbh}
				getAPI={(id: string) => {
					if (id && id != "") {
						getIEInfoById(
							id,
							(info: IEInfo) => {
								info.pjrq = dayjs(info.pjrq);
								info.bgrcsrq = dayjs(info.bgrcsrq);
								info.ypxqjsrq = dayjs(info.ypxqjsrq);
								info.ypxqksrq = dayjs(info.ypxqksrq);
								setInfo(info);
							},
							() => gMsg.onError("找不到此更新对象!")
						);

						console.log(info);
					}
				}}
				onOk={handleOk}
				confirmLoading={confirmLoading}
			/>
		</>
	);
}
