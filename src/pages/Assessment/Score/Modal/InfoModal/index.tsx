import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { List, Space, Tag } from "antd";
import { useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { ScoreDetail } from "@/entity/Assessment/ScoreDetail";
import { DataType } from "../..";
import { getScoreDetail } from "@/api/assessment/score";
import { useRequest } from "ahooks";
import { getDate } from "@/utils/ie";
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	gMsg: GMessage;
	tableUpdate: boolean;
}) {
	const { open, setOpen, info, gMsg, tableUpdate } = props;
	const [scoreDetail, setScoreDetail] = useState<ScoreDetail>(
		{} as ScoreDetail
	);

	useRequest(() => getScoreDetail(info.dxbh), {
		onSuccess: ({ data }) => {
			const detail = data.data;
			const lists = detail.map((item: any) => {
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
		onError: (err) => {
			gMsg.onError(err);
		},
		onFinally: () => {
			setOpen(false);
		},
		debounceWait: 300,
		refreshDeps: [info.dxbh, tableUpdate],
		ready: info && info.dxbh != "",
	});

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
										<Tag>{item.score}分</Tag>-
										<Tag>{item.reason}</Tag>-
										<Tag>
											{getDate(item.date)}
										</Tag>
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
