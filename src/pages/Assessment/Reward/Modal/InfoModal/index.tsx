import { RewardInfo } from "@/entity/Assessment/Reward/RewardInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { jllbMap, map2Value } from "@/utils";
import { getDate } from "@/utils/ie";
import { DataType } from "../..";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
}) {
	const { open, setOpen, info } = props;

	const getInfos = (info: RewardInfo) => {
		return [
			{ label: "对象编号", value: info.dxbh },
			{
				label: "姓名",
				value: info.xm,
			},
			{
				label: "奖励类别",
				value: map2Value(jllbMap, info.jllb),
			},
			{
				label: "奖励原因",
				value: info.jlyy,
			},
			{
				label: "奖励时间",
				value: getDate(info.date),
			},
			{
				label: "记录人",
				value: info.jlr,
			},
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"奖励详情"}
					info={info ? getInfos(info) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
