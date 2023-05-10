import { Card, Form } from "antd";

import { savePlan } from "@/api/ic/crplan";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { AddPlanForm } from "../../Form/AddPlanForm";

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
		onSuccess({ data }) {
			if (data.status == "200" && data.data == true) {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("新增矫正方案");
			} else {
				gMsg.onError(data.message);
			}
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
		console.log(values);
		run(values);
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<Card title={"新增矫正方案"}>
					<AddPlanForm
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
