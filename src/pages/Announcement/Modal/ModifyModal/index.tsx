import { updateAnnounce } from "@/api/ic/announce";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { DataType } from "../..";
import RegisterForm from "../../Form/RegisterForm";

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
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("修改成功！");
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
		const info = values as CrpAnnouncement;
		const url = form.getFieldValue("zz");
		if (url) info.audio = url;
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
