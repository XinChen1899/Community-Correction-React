import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { List, Space } from "antd";
import { useEffect, useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { ScoreDetail } from "@/entity/Assessment/ScoreDetail";
import { DataType } from "../..";
import { getScoreDetail } from "@/api/assessment/score";
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, gMsg } = props;
	const [scoreDetail, setScoreDetail] = useState<ScoreDetail>(
		{} as ScoreDetail
	);

	useEffect(() => {
		// todo 获取 dxbh的详细计分情况
		if (info && info.dxbh) {
			getScoreDetail(
				info.dxbh,
				(detail: any[]) => {
					const lists = detail.map((item) => {
						return {
							reason: item.reason,
							score: item.score,
							date: item.date,
						};
					});
					setScoreDetail({
						dxbh: detail[0].dxbh,
						detail: lists,
					});
				},
				(msg: string) => {
					gMsg.onError(msg);
				}
			);
		}
		console.log(scoreDetail);
	}, [info]);

	const getInfos = (info: ScoreDetail) => {
		return [
			{ label: "对象编号", value: info.dxbh },
			{
				label: "计分情况",
				value: (
					<List
						bordered
						dataSource={info.detail}
						renderItem={(item) => {
							return (
								<List.Item>
									<Space>
										{item.score}分-{item.reason}-
										{item.date}
									</Space>
								</List.Item>
							);
						}}
					/>
				),
			},
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"计分详情"}
					info={scoreDetail ? getInfos(scoreDetail) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
