import { GMessage } from "@/utils/msg/GMsg";
import { Exit } from "@/entity/NoExit/Exit";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { DataType } from "../..";

/**
 * 查询所有社矫对象（可选择类别：在
矫、解矫）关于出入境方面的情况：
是否已同级报备、证件是否已代管/
归还/收缴/吊销/作废、是否有出境
风险、是否已办边控手续（初态为：
未边控）。
 */
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, gMsg } = props;

	const getInfos = (exitInfo: Exit) => {
		return [
			{ label: "对象编号", value: exitInfo.dxbh },
			{ label: "姓名", value: exitInfo.xm },
			{
				label: "报备状态",
				value: exitInfo.bb ? "已报备" : "待报备",
			},
			{ label: "证件", value: exitInfo.zj },
			{
				label: "边控状态",
				value: exitInfo.bk ? "已边控" : "未边控",
			},
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"出入境情况表"}
					info={info ? getInfos(info) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
