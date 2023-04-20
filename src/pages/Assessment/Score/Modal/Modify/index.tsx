import { saveScoreModify } from "@/api/assessment/score";
import { ScoreModify } from "@/entity/Assessment/Score/ScoreModify";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import dayjs from "dayjs";
import ModifyForm from "../../Form/ModifyForm";

export default function ModifyModal(props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	info: any;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { setOpen, open, gMsg, info, tableUpdate, setTableUpdate } =
		props;

	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};

	const { loading, run } = useRequest(
		(detail: any) => saveScoreModify(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("计分成功!");
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
		const detail = values as ScoreModify;
		if (values.select == "02") detail.score = -detail.score;
		run(detail);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<ModifyForm
						form={form}
						onFinish={onFinish}
						initialValues={{ date: dayjs(), ...info }}
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
