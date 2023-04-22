import { updateAnnouncement } from "@/api/uncorrected/announcement";
import { UnCorrectedAnnouncement } from "@/entity/Uncorrected/UnCorrectedAnnouncement";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";
import AnnouncementForm from "../Form/AnnouncementForm";

function ModifyAnnouncementModal(props: {
	open: boolean;
	setOpen: any;
	info: UnCorrectedAnnouncement;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { open, setOpen, info, gMsg, tableUpdate, setTableUpdate } =
		props;
	const [form] = useForm();

	useEffect(() => {
		if (info.xgrq) info.xgrq = dayjs(info.xgrq);
	}, [info]);

	const handleOk = () => {
		form.submit();
	};
	const { loading, run } = useRequest(
		(detail) => updateAnnouncement(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("更新成功！");
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
		<TemplateModal
			InfoDescriptions={
				<AnnouncementForm
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

export default ModifyAnnouncementModal;
