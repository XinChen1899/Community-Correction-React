import { saveAnnounce } from "@/api/ic/announce";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import RegisterForm from "../../Form/RegisterForm";

export default function RegisterModal(props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { setOpen, open, gMsg, tableUpdate, setTableUpdate } =
		props;

	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};
	const { loading, run } = useRequest(
		(detail: CrpAnnouncement) => saveAnnounce(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("登记成功");
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

	// 提交表单时操作
	const onFinish = (values: any) => {
		const info = values as CrpAnnouncement;
		const url = form.getFieldValue("zz");
		if (url) info.audio = url;
		run(info);
	};

	return (
			<TemplateModal
				InfoDescriptions={
					<RegisterForm
						form={form}
						onFinish={onFinish}
						initialValues={{}}
					/>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				confirmLoading={loading}
			/>
	);
}
