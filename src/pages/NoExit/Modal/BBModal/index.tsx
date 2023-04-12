import TemplateModal from "@/template/Modal";
import { BBForm } from "../../Form/BBForm";
import { Button, Card, Form, Steps } from "antd";
import { BBInfo } from "@/entity/NoExit/BBInfo";
import { getBBForm, updateBBForm } from "@/api/noexit";
import { useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import dayjs from "dayjs";
import { getDate } from "@/utils/ie";

// todo 报备流程审批

export default function BBModal(props: {
	open: boolean;
	setOpen: any;
	dxbh: string;
	gMsg: GMessage;
	infoUpdate: boolean;
	setInfoUpdate: any;
}) {
	const { open, setOpen, dxbh, gMsg, infoUpdate, setInfoUpdate } =
		props;
	const [form] = Form.useForm();
	const [bbForm, setBBForm] = useState<BBInfo>();

	const [isSubmit, setSubmit] = useState(false);

	const handleOk = () => {
		form.submit();
		setOpen(false);
	};

	const onFinish = (values: any) => {
		const bbInfo = values as BBInfo;
		bbInfo.bbrq = getDate(bbInfo.bbrq);
		bbInfo.bbjsrq = getDate(bbInfo.bbjsrq);
		bbInfo.bbksrq = getDate(bbInfo.bbksrq);
		if (isSubmit) bbInfo.step += 1;
		updateBBForm(
			bbInfo,
			() => {
				setInfoUpdate(!infoUpdate);
				gMsg.onSuccess("更新成功!");
			},
			(msg: string) => {
				gMsg.onError("更新失败！" + msg);
			}
		);
		setOpen(false);
	};

	const bbInfo: BBInfo = {
		dxbh: "00000000",
		xm: "",
		xb: "",
		sfzh: "",
		crjzjzl: "",
		crjzjhm: "",
		bbsldw: "",
		bbdw: "",
		bbrq: "",
		bbksrq: "",
		bbjsrq: "",
		step: 3,
	};

	return (
		<TemplateModal
			title="出入境报备信息"
			infoUpdate={infoUpdate}
			InfoDescriptions={
				<BBForm
					disabled={bbForm ? bbForm.step > 0 : false}
					form={form}
					onFinish={onFinish}
					initialValues={bbForm}
				/>
			}
			footer={[
				<Button
					key="submit"
					type="primary"
					onClick={() => {
						setSubmit(true);
						handleOk();
					}}>
					提交给公安审核
				</Button>,
				<Button key="back" onClick={() => setOpen(false)}>
					返回
				</Button>,
				<Button key="save" type="primary" onClick={handleOk}>
					保存
				</Button>,
			]}
			onOk={handleOk}
			open={open}
			setOpen={setOpen}
			getAPI={(id: string) => {
				getBBForm(
					id,
					(data: BBInfo) => {
						data.bbrq = dayjs(data.bbrq);
						data.bbjsrq = dayjs(data.bbjsrq);
						data.bbksrq = dayjs(data.bbksrq);
						setBBForm(data);
					},
					(err: any) => {
						setBBForm(bbInfo);
						gMsg.onError("获取报备信息失败！" + err);
					}
				);
			}}
			recordId={dxbh}>
			<Card>
				<Steps
					current={
						bbForm
							? bbForm.step == 2
								? 3
								: bbForm.step
							: 0
					}
					// status="wait" // wait process finish error
					items={[
						{
							title: "等待提交备案信息",
						},
						{
							title: "公安系统审批",
						},
						{
							title: "备案完成",
						},
					]}
				/>
			</Card>
		</TemplateModal>
	);
}
