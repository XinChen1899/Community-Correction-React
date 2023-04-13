import { Card, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Space } from "antd/lib";
import { getIEInfoById, updateIEInfoData } from "@/api/ie";
import { IeFormConvert2IeInfo, IeInfo2Ieform } from "@/utils/ie";
import { IEInfoForm } from "@/pages/InvestigatorsEvaluated/Form/IEInfoForm";
import { GMessage } from "@/utils/msg/GMsg";
import { IEInfo } from "@/entity/IE/IEInfo";
import dayjs from "dayjs";
import TemplateModal from "@/template/Modal";
import { DataType } from "../..";

interface ITaskInfoModal {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	gMsg: GMessage;
}

export default function TaskModifyModal(props: ITaskInfoModal) {
	const { open, setOpen, info, setTableUpdate, tableUpdate, gMsg } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(IeInfo2Ieform(info));
	});

	const onFinish = (values: any) => {
		const info = IeFormConvert2IeInfo(values);

		updateIEInfoData(
			info,
			() => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("修改成功！");
			},
			(msg: string) => {
				gMsg.onError("修改失败！" + msg);
			},
			setConfirmLoading
		);
		setOpen(false);
	};

	const handleOk = () => {
		form.submit();
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
				onOk={handleOk}
				confirmLoading={confirmLoading}
			/>
		</>
	);
}
