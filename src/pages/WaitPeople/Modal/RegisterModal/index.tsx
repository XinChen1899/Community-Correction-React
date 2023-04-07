import { useState } from "react";
import { Card, Form, Modal } from "antd";

import { GMessage } from "@/coderepo/msg/GMsg";
import { RegisterForm } from "../../Form/RegisterForm";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { getDate } from "@/coderepo/ie";
import { registerCrp } from "@/api/ic";
import { mzMap } from "@/coderepo";
import TemplateModal from "@/template/Modal";

const RegisterModal = (props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
	infoUpdate: any;
	setInfoUpdate: any;
}) => {
	const {
		setOpen,
		open,
		gMsg,
		tableUpdate,
		setTableUpdate,
		infoUpdate,
		setInfoUpdate,
	} = props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const handleOk = () => {
		setConfirmLoading(true);
		form.submit();
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 500);
	};

	// 提交表单时操作
	const onFinish = async (values: any) => {
		const crp = values as CorrectionPeople;
		crp.csrq = getDate(crp.csrq);
		mzMap.forEach((obj) => {
			if (obj.code == crp.mz) {
				crp.mz = obj.value;
				return;
			}
		});
		registerCrp(
			crp,
			() => {
				gMsg.onSuccess("登记成功！");
				setTableUpdate(!tableUpdate);
				setInfoUpdate(!infoUpdate);
			},
			(msg: string) => {
				gMsg.onError("登记失败！" + msg);
			}
		);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<RegisterForm
						form={form}
						onFinish={onFinish}
						initialValues={{
							sqjzdxbh: "00000001",
							sfdcpg: "否",
							jzlb: "管制",
							xb: "男",
							mz: "汉族",
							gj: "中国籍",
							hjlx: "乡村人口",
							whcd: "其他",
							hyzk: "其他",
							jyjxqk: "就业",
							ywjtcyjzyshgx: "是",
						}}
					/>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				getAPI={undefined}
				recordId={undefined}
			/>
		</>
	);
};

export default RegisterModal;
