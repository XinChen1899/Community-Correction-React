import { updateIEInfo } from "@/api/ie";
import { IEInfo } from "@/entity/IE/IEInfo";
import { IEInfoForm } from "@/pages/InvestigatorsEvaluated/Form/IEInfoForm";
import TemplateModal from "@/template/Modal";
import { IeFormConvert2IeInfo, IeInfo2Ieform } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { DataType } from "../..";

interface ITaskInfoModal {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	gMsg: GMessage;
}

export default function TaskModifyModal(props: ITaskInfoModal) {
	const { open, setOpen, info, setTableUpdate, tableUpdate, gMsg } =
		props;

	const [form] = Form.useForm();

	const { loading, run } = useRequest(
		(detail: IEInfo) => updateIEInfo(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("修改成功！!");
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

	const onFinish = (values: any) => {
		const info = IeFormConvert2IeInfo(values);
		run(info);
	};

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<IEInfoForm
						form={form}
						onFinish={onFinish}
						initialValues={IeInfo2Ieform(info)}
						disabled={info.finish == 0}
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
