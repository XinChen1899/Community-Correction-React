import TemplateModal from "@/template/Modal";
import { Card, Form, Steps } from "antd";
import { BBInfo } from "@/entity/NoExit/BBInfo";
import { getBBForm, updateBBForm } from "@/api/NoExit";
import { useState } from "react";
import { GMessage } from "@/coderepo/msg/GMsg";
import dayjs from "dayjs";
import { getDate } from "@/coderepo/ie";
import { CategoryForm } from "../../Form/CategoryForm";
import { CategoryInfo } from "@/entity/Category/CategoryInfo";

// todo 报备流程审批

export default function ModifyModal(props: {
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
	const [info, setInfo] = useState<CategoryInfo>();

	const handleOk = () => {
		form.submit();
		setOpen(false);
	};

	const onFinish = (values: any) => {
		console.log(values);
		// const bbInfo = values as BBInfo;
		// bbInfo.bbrq = getDate(bbInfo.bbrq);
		// bbInfo.bbjsrq = getDate(bbInfo.bbjsrq);
		// bbInfo.bbksrq = getDate(bbInfo.bbksrq);

		// updateBBForm(
		// 	bbInfo,
		// 	() => {
		// 		setInfoUpdate(!infoUpdate);
		// 		gMsg.onSuccess("更新成功!");
		// 		console.log(bbForm?.step);
		// 	},
		// 	(msg: string) => {
		// 		gMsg.onError("更新失败！" + msg);
		// 	}
		// );
	};

	return (
		<TemplateModal
			title="出入境报备信息"
			infoUpdate={infoUpdate}
			InfoDescriptions={
				<CategoryForm
					form={form}
					onFinish={onFinish}
					initialValues={info}
				/>
			}
			onOk={handleOk}
			open={open}
			setOpen={setOpen}
			getAPI={(id: string) => {
				// getBBForm(
				// 	id,
				// 	(data: BBInfo) => {
				// 		data.bbrq = dayjs(data.bbrq);
				// 		data.bbjsrq = dayjs(data.bbjsrq);
				// 		data.bbksrq = dayjs(data.bbksrq);
				// 		setBBForm(data);
				// 	},
				// 	(err: any) => {
				// 		setBBForm(bbInfo);
				// 		gMsg.onError("获取报备信息失败！" + err);
				// 	}
				// );
			}}
			recordId={dxbh}>
			{/* <Card>
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
			</Card> */}
		</TemplateModal>
	);
}
