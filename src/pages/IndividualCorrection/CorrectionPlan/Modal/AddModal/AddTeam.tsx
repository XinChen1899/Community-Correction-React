import { Card, Form } from "antd";

import { savePlan } from "@/api/ic/crplan";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import TemplateModal from "@/template/Modal";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { AddTeamForm } from "../../Form/AddTeamForm";

const AddModal = (props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) => {
	const { setOpen, open, gMsg, tableUpdate, setTableUpdate } =
		props;

	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};

	const { loading, run } = useRequest((info) => savePlan(info), {
		onSuccess() {
			setTableUpdate(!tableUpdate);
			gMsg.onSuccess("新增矫正方案");
		},
		onError(e) {
			gMsg.onError("矫正方案保存失败" + e.message);
		},
		onFinally() {
			setOpen(false);
		},
		manual: true,
		debounceWait: 300,
	});

	// 提交表单时操作
	const onFinish = (values: any) => {
		const info = values as CrpPlan;
		info.pgsj = getDate(info.pgsj);

		run(info);
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<Card title={"新增矫正方案"}>
					<AddTeamForm
						form={form}
						onFinish={onFinish}
						initialValues={{}}
					/>
				</Card>
			}
			open={open}
			setOpen={setOpen}
			confirmLoading={loading}
			onOk={handleOk}
		/>
	);
};

export default AddModal;
