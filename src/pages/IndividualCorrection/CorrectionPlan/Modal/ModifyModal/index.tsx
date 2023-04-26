import { updatePlan } from "@/api/ic/crplan";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { DataType } from "../..";
import { AddPlanForm } from "../../Form/AddPlanForm";

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

	const { loading, run } = useRequest((info) => updatePlan(info), {
		onSuccess: ({ data }) => {
			if (data.status == "200" && data.data == true) {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("修改成功!");
			} else {
				gMsg.onError(data.message);
			}
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
		const url = form.getFieldValue("zz");
		values.plan = url;
		run(values);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<AddPlanForm
						form={form}
						onFinish={onFinish}
						initialValues={info}
						disabled={true}
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
