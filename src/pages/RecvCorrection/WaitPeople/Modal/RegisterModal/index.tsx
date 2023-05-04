import { registerCrp } from "@/api/ic";
import { CorrectionPeople } from "@/entity/IC/Crp";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { RegisterForm } from "../../Form/RegisterForm";

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
		const crp = values as CorrectionPeople;
		run(crp);
	};

	return (
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
	);
};

export default RegisterModal;
