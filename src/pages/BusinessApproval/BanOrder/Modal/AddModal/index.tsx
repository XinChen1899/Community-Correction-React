import { saveBanInfo } from "@/api/business/ban";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import dayjs from "dayjs";
import { DataType } from "../..";
import AddForm from "../../Form/AddForm";

export default function AddModal(props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
	info?: DataType;
}) {
	const { setOpen, open, gMsg, tableUpdate, setTableUpdate, info } =
		props;

	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};

	const { loading, run } = useRequest(
		(detail) => saveBanInfo(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("操作成功!");
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
		const detail = values as BanInfo;
		if (detail.dxbh != "") {
			detail.step =
				info == undefined ? 0 : info.step ? info.step : 0;
			run(detail);
		}
	};

	if (info != undefined) {
		if (info.sqrq) info.sqrq = dayjs(info.sqrq);
		if (info.sqjrsj) info.sqjrsj = dayjs(info.sqjrsj);
		if (info.sqjssj) info.sqjssj = dayjs(info.sqjssj);
		if (info.sfsshsj) info.sfsshsj = dayjs(info.sfsshsj);
		if (info.xjsqjzjgspsj)
			info.xjsqjzjgspsj = dayjs(info.xjsqjzjgspsj);
	}
	return (
		<TemplateModal
			InfoDescriptions={
				<AddForm
					form={form}
					onFinish={onFinish}
					initialValues={info}
					disabled={info && info.step > 0}
				/>
			}
			open={open}
			setOpen={setOpen}
			onOk={handleOk}
			confirmLoading={loading}
		/>
	);
}
