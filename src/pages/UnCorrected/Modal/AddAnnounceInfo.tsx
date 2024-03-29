import { saveAnnouncement } from "@/api/uncorrected/announcement";
import { UnCorrectedAnnouncement } from "@/entity/Uncorrected/UnCorrectedAnnouncement";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import AnnouncementForm from "../Form/AnnouncementForm";

export default function AddAnnouncementModal(props: {
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
		(detail) => saveAnnouncement(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("保存成功！");
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
		const detail = values as UnCorrectedAnnouncement;
		if (detail && detail.dxbh != "") {
			run(detail);
		}
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<AnnouncementForm
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
		</>
	);
}
