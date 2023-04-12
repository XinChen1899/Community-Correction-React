import TemplateModal from "@/template/Modal";
import { Form } from "antd";
import { GMessage } from "@/utils/msg/GMsg";
import { CategoryForm } from "../../Form/CategoryForm";
import { CrpCategory } from "@/entity/Category/CategoryInfo";
import { map2Value, nsyjzlbMap } from "@/utils";
import { updateCate } from "@/api/cate";

export default function ModifyModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { open, setOpen, info, gMsg, tableUpdate, setTableUpdate } =
		props;
	const [form] = Form.useForm();

	info.gglb = map2Value(nsyjzlbMap, info.gllb);
	const handleOk = () => {
		form.submit();
		setOpen(false);
	};

	const onFinish = (values: any) => {
		const info = values as CrpCategory;
		updateCate(
			info,
			() => {
				// setInfoUpdate(!infoUpdate);
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("更新成功!");
			},
			(msg: string) => {
				gMsg.onError("更新失败！" + msg);
			}
		);
	};

	return (
		<TemplateModal
			title="出入境报备信息"
			InfoDescriptions={
				<CategoryForm
					form={form}
					onFinish={onFinish}
					initialValues={info}
				/>
			}
			onOk={handleOk}
			open={open}
			setOpen={setOpen}
			getAPI={() => {}}
			recordId={undefined}></TemplateModal>
	);
}
