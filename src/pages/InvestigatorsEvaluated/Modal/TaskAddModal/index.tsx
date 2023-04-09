import { useEffect, useState } from "react";
import { Form } from "antd";

import "@/entity/IE/IEInfo";
import { getIEInfoById, saveIEInfoData } from "@/api/ie";
import { IEInfoForm } from "@/pages/InvestigatorsEvaluated/Form/IEInfoForm";
import { IeFormConvert2IeInfo } from "@/coderepo/ie";
import { GMessage } from "@/coderepo/msg/GMsg";
import TemplateModal from "@/template/Modal";
import { IEInfo } from "@/entity/IE/IEInfo";
import dayjs from "dayjs";

const TaskAddModal = (props: {
	open: boolean;
	setOpen: any;
	tableUpdate: boolean;
	setTableUpdate: any;
	wtbh: string;
	gMsg: GMessage;
}) => {
	const { setOpen, open, setTableUpdate, tableUpdate, wtbh, gMsg } =
		props;

	const [confirmLoading, setConfirmLoading] = useState(false);
	const [info, setInfo] = useState<IEInfo>();
	const [form] = Form.useForm();

	const handleOk = () => {
		setConfirmLoading(true);
		form.submit();
	};

	// 提交表单时操作
	// 新增调查评估时，同时新增调查评估信息
	const onFinish = async (values: any) => {
		const tempInfo = IeFormConvert2IeInfo(values);
		saveIEInfoData(
			tempInfo,
			() => {
				gMsg.onSuccess("新增调查评估!");
				setTableUpdate(!tableUpdate);
				setOpen(false);
				setConfirmLoading(false);
			},
			(msg: string) => {
				gMsg.onError("登记失败！" + msg);
			}
		);
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<IEInfoForm
					form={form}
					onFinish={onFinish}
					initialValues={{
						wtbh,
						wtdw: "01",
						bdcpgrdlx: "01",
						bgrxb: "male",
						zm: "01",
						ypxf: "01",
						fjx: "99",
						pjjg: "01",
						nsyjzlb: "02",
					}}
				/>
			}
			open={open}
			setOpen={setOpen}
			onOk={handleOk}
			confirmLoading={confirmLoading}
			getAPI={(id: string) => {
				if (id && id != "") {
					getIEInfoById(id, (info: IEInfo) => {
						info.pjrq = dayjs(info.pjrq);
						info.bgrcsrq = dayjs(info.bgrcsrq);
						info.ypxqjsrq = dayjs(info.ypxqjsrq);
						info.ypxqksrq = dayjs(info.ypxqksrq);
						setInfo(info);
					});

					console.log(info);
				}
			}}
			recordId={wtbh}
		/>
	);
};

export default TaskAddModal;
