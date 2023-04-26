import { getSuggestInfoById, updateSuggestInfoData } from "@/api/ie";
import { SuggestInfo } from "@/entity/IE/SuggestInfo";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { useState } from "react";
import { SuggestForm } from "../../Form/SuggestForm";

export default function SuggestModal(props: {
	open: boolean;
	setOpen: any;
	wtbh: string;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { open, setOpen, wtbh, gMsg, tableUpdate, setTableUpdate } =
		props;

	const [form] = Form.useForm();

	const [suggest, setSuggest] = useState<SuggestInfo>({
		wtbh: "",
	} as SuggestInfo);

	const handleOk = () => {
		form.submit();
	};

	const { loading, run } = useRequest(
		(detail) => updateSuggestInfoData(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("更新成功!");
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

	useRequest(() => getSuggestInfoById(wtbh), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				const sug = data.data;
				setSuggest(sug);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [wtbh],
		ready: open,
	});

	return (
		<>
			<TemplateModal
				title="调查评估意见书编辑"
				InfoDescriptions={
					<SuggestForm
						form={form}
						onFinish={(v: any) => {
							v.yjs = form.getFieldValue("zz");
							console.log(v);
							run(v);
						}}
						initialValues={{ ...suggest }}
					/>
				}
				onOk={handleOk}
				open={open}
				setOpen={setOpen}
				confirmLoading={loading}
			/>
		</>
	);
}
