import { updatePlan } from "@/api/ic/crplan";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import TemplateModal from "@/template/Modal";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { DataType } from "../..";
import { AddTeamForm } from "../../Form/AddTeamForm";

export default function ModifyModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, setTableUpdate, tableUpdate, gMsg } =
		props;

	const [form] = Form.useForm();

	useEffect(() => {
		info.pgsj = dayjs(info.pgsj);
		form.resetFields();
		form.setFieldsValue(info);
	});

	const { loading, run } = useRequest((info) => updatePlan(info), {
		onSuccess() {
			setTableUpdate(!tableUpdate);
			gMsg.onSuccess("修改成功！");
		},
		onError(e) {
			gMsg.onError("修改失败！" + e.message);
		},
		onFinally() {
			setOpen(false);
		},
		manual: true,
		debounceWait: 300,
	});

	const onFinish = (values: any) => {
		const info = values as CrpPlan;
		info.pgsj = getDate(info.pgsj);
		console.log(info);
		run(info);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<AddTeamForm
						form={form}
						onFinish={onFinish}
						initialValues={info}
					/>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				confirmLoading={loading}
			/>
		</>
	);
}
