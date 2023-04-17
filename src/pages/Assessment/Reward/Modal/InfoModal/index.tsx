import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { DataType, RewardInfo } from "../..";
import { getDate } from "@/utils/ie";
import { jllbMap, map2Value } from "@/utils";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	gMsg: GMessage;
	tableUpdate: boolean;
}) {
	const { open, setOpen, info, gMsg, tableUpdate } = props;
	const [detail, setDetail] = useState<RewardInfo>(info);

	// useRequest(() => getScoreDetail(info.dxbh), {
	// 	onSuccess: ({ data }) => {
	// 		const detail = data.data;
	// 		const lists = detail.map((item: any) => {
	// 			return {
	// 				reason: item.reason,
	// 				score: item.score,
	// 				date: item.date,
	// 			};
	// 		});
	// 		setScoreDetail({
	// 			dxbh: detail[0].dxbh,
	// 			detail: lists,
	// 		});
	// 	},
	// 	onError: (err) => {
	// 		gMsg.onError(err);
	// 	},
	// 	onFinally: () => {
	// 		setOpen(false);
	// 	},
	// 	debounceWait: 300,
	// 	refreshDeps: [info.dxbh, tableUpdate],
	// 	ready: info && info.dxbh != "",
	// });

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
					info={detail ? getInfos(detail) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
