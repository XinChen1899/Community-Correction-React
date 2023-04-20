import { saveRewardInfo } from "@/api/assessment/reward";
import { RewardInfo } from "@/entity/Assessment/Reward/RewardInfo";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { DataType } from "../..";
import AddForm from "../../Form/AddForm";

export default function AddModal(props: {
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
		(detail: DataType) => saveRewardInfo(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("新增奖励!");
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
		const detail = values as RewardInfo;
		if (detail.dxbh != "") run(detail);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<AddForm
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
