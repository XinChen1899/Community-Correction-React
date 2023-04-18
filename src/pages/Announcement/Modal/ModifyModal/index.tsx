import { Form } from "antd";
import { useEffect } from "react";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import TemplateModal from "@/template/Modal";
import { DataType } from "../..";
import RegisterForm from "../../Form/RegisterForm";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import { updateAnnounce } from "@/api/ic/announce";
import dayjs from "dayjs";
import { useRequest } from "ahooks";

interface ITaskInfoModal {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	gMsg: GMessage;
}

export default function ModifyModal(props: ITaskInfoModal) {
	const { open, setOpen, info, setTableUpdate, tableUpdate, gMsg } =
		props;

	const [form] = Form.useForm();

	useEffect(() => {
		info.xgrq = dayjs(info.xgrq);
		form.resetFields();
		form.setFieldsValue(info);
	});

	const { loading, run } = useRequest(
		(detail: CrpAnnouncement) => updateAnnounce(detail),
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
		const info = values as CrpAnnouncement;
		info.xgrq = getDate(info.xgrq);

		run(info);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<RegisterForm
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
