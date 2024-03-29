import { updateCrt } from "@/api/ic/crteam";
import { CrTeam } from "@/entity/IC/CrTeam";
import { Worker } from "@/entity/IC/Worker";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { useEffect } from "react";
import { DataType } from "../..";
import { AddTeamForm } from "../../Form/AddTeamForm";

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
	}, [info]);

	const { loading, run } = useRequest(
		(detail) => updateCrt(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("修改成功");
				} else {
					gMsg.onError(data.message);
				}
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
		cteam.number = cteam.workers.length;
		cteam.id = info.id;
		run(cteam);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
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
	);
}
