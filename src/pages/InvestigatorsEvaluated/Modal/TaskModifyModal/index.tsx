import { Form } from "antd";
import { useEffect } from "react";
import { updateIEInfo } from "@/api/ie";
import { IeFormConvert2IeInfo, IeInfo2Ieform } from "@/utils/ie";
import { IEInfoForm } from "@/pages/InvestigatorsEvaluated/Form/IEInfoForm";
import { GMessage } from "@/utils/msg/GMsg";
import { IEInfo } from "@/entity/IE/IEInfo";
import TemplateModal from "@/template/Modal";
import { DataType } from "../..";
import { useRequest } from "ahooks";

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

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(IeInfo2Ieform(info));
	});

	const { loading, run } = useRequest(
		(detail: IEInfo) => updateIEInfo(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("修改成功！!");
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
						initialValues={info}
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
