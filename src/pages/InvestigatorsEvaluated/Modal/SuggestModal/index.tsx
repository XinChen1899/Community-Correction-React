import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { SuggestForm } from "../../Form/SuggestForm";
import { Form } from "antd";
import { getSuggestInfoById, updateSuggestInfoData } from "@/api/ie";
import { useState } from "react";
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
	taskUpdate: boolean;
	wtbh: string;
	gMsg: GMessage;
}) {
	const { open, setOpen, wtbh, gMsg } = props;

	const [form] = Form.useForm();
	const [value, setValue] = useState(DefaultYJS); //value就是调查评估意见书

	const handleOk = () => {
		form.submit();
	};

	return (
		<>
			<TemplateModal
				title="调查评估意见书编辑"
				InfoDescriptions={
					<SuggestForm
						form={form}
						onFinish={(v: any) => {
							updateSuggestInfoData(
								{
									wtbh,
									yjs: value,
								},
								() => {
									gMsg.onSuccess("更新成功");
								},
								() => {
									gMsg.onError("更新失败");
								}
							);
							setOpen(false);
						}}
						initialValues={{ wtbh }}
						quillValue={value}
						setQuillValue={setValue}
					/>
				}
				onOk={handleOk}
				open={open}
				setOpen={setOpen}
				getAPI={(id: string) => {
					getSuggestInfoById(
						id,
						(sug: any) => {
							if (sug) {
								setValue(sug.yjs);
							} else {
								setValue(DefaultYJS);
							}
						},
						(msg: string) => {
							gMsg.onError("出错啦!" + msg);
						}
					);
				}}
				recordId={wtbh}
			/>
		</>
	);
}
