import { getSuggestInfoById, updateSuggestInfoData } from "@/api/ie";
import { SuggestInfo } from "@/entity/IE/SuggestInfo";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Form } from "antd";
import { useState } from "react";
import { SuggestForm } from "../../Form/SuggestForm";
const DefaultYJS = `
<h1>调查评估意见书</h1>
<br/>
<p>（    ） 字第  号</p><br/>
<p>人民法院（公安局、监狱管理局）：</p><br/>
<p>
受你单位委托，我单位于    年  月   日至   年          月   日对被告人（罪犯）        进行了调查评估。有关情况如下：
</p><br/>
<p>
综合以上情况，评估意见为

。
</p><br/>
（公章）
<p>
年  月  日

注：抄送       人民检察院。
</p><br/>
`;
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
				if (!sug.yjs || sug.yjs == "") sug.yjs = DefaultYJS;
				setSuggest(sug);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [wtbh],
		ready: open,
	});
	const [docx, setDocx] = useState("");

	return (
		<>
			<TemplateModal
				title="调查评估意见书编辑"
				InfoDescriptions={
					<SuggestForm
						form={form}
						onFinish={(v: any) => {
							suggest.dcyjshr = v.dcyjshr;
							console.log(docx);
							run(suggest);
						}}
						initialValues={{ ...suggest }}
						quillValue={suggest.yjs}
						setQuillValue={(v: any) => {
							setDocx(v);
						}}
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
