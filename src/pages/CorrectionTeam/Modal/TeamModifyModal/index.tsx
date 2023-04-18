import { Form } from "antd";
import { useEffect, useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { DataType } from "../..";
import { CrTeam } from "@/entity/IC/CrTeam";
import { AddTeamForm } from "../../Form/AddTeamForm";
import TemplateModal from "@/template/Modal";
import { Worker } from "@/entity/IC/Worker";
import { updateCrt } from "@/api/ic/crteam";
import { useRequest } from "ahooks";

export default function TeamModifyModal(props: {
	open: boolean;
	setOpen: any;
	worker: Worker[];
	info: DataType;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const {
		open,
		setOpen,
		info,
		gMsg,
		worker,
		tableUpdate,
		setTableUpdate,
	} = props;

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(info);
	});

	const { loading, run } = useRequest(
		(detail: CrTeam) => updateCrt(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("修改成功！");
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			onFinally: () => {
				setOpen(false);
			},
			manual: true,
			debounceWait: 300,
		}
	);

	const onFinish = (values: any) => {
		const cteam = values as CrTeam;
		cteam.teamNumber = cteam.workers.length;
		// console.log(values);
		// console.log(cteam);
		run(cteam);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				title={"修改id为" + info.id + "的矫正小组信息"}
				InfoDescriptions={
					<AddTeamForm
						form={form}
						onFinish={onFinish}
						initialValues={info}
						worker={worker}
					/>
				}
				onOk={handleOk}
				open={open}
				setOpen={setOpen}
				confirmLoading={loading}
			/>
		</>
	);
}
