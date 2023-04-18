import { Form } from "antd";
import { GMessage } from "@/utils/msg/GMsg";
import { RegisterForm } from "../../Form/RegisterForm";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { getDate } from "@/utils/ie";
import { registerCrp } from "@/api/ic";
import TemplateModal from "@/template/Modal";
import { useRequest } from "ahooks";

const RegisterModal = (props: {
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

	const { loading, run } = useRequest(
		(detail: CorrectionPeople) => registerCrp(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("登记成功！");
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
		const crp = values as CorrectionPeople;
		crp.csrq = getDate(crp.csrq);

		run(crp);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<RegisterForm
						form={form}
						onFinish={onFinish}
						initialValues={{}}
						gMsg={gMsg}
					/>
				}
				open={open}
				setOpen={setOpen}
				onOk={handleOk}
				confirmLoading={loading}
			/>
		</>
	);
};

export default RegisterModal;
