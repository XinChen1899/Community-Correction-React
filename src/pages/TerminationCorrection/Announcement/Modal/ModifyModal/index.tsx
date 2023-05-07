import { updateTermAnnounce } from "@/api/termination/announce";
import { TermAnnounce } from "@/entity/Termination/TermAnnounce";
import TemplateModal from "@/template/Modal";
import { getDayjs } from "@/utils/date";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { DataType } from "../..";
import RegisterForm from "../../Form/RegisterForm";

interface ITaskInfoModal {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
}

export default function ModifyModal(props: ITaskInfoModal) {
	const { open, setOpen, info, setTableUpdate, tableUpdate, gMsg } =
		props;

	const [form] = Form.useForm();

	if (open) {
		info.xgrq = getDayjs(info.xgrq);
		form.resetFields();
		form.setFieldsValue(info);
	}

	const { loading, run } = useRequest(
		(detail) => updateTermAnnounce(detail),
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
		const info = values as TermAnnounce;
		const url = form.getFieldValue("zz");
		if (url) info.audio = url;
		run(info);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
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
	);
}
