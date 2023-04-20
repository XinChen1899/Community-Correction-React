import { getScoreDetail } from "@/api/assessment/score";
import { ScoreDetail } from "@/entity/Assessment/ScoreDetail";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateTag, { TagType } from "@/template/Tag";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { List, Skeleton } from "antd";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DataType } from "../..";
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

	const getInfos = (detail: ScoreDetail) => {
		if (detail == undefined || detail.detail == undefined)
			return [];
		return [
			{ label: "对象编号", value: detail.dxbh },
			{ label: "对象姓名", value: info.xm },
			{ label: "总分", value: info.score },
			{
				label: "计分情况",
				value: (
					<InfiniteScroll
						dataLength={detail.detail.length}
						next={() => {}}
						scrollableTarget="scrollableDiv"
						hasMore={false}
						loader={
							<Skeleton
								avatar
								paragraph={{ rows: 1 }}
								active
							/>
						}>
						<List
							bordered
							dataSource={detail.detail}
							renderItem={(item) => {
								return (
									<List.Item>
										<List.Item.Meta
											title={item.reason}
											description={getDate(
												item.date
											)}
										/>
										<div>
											{item.score > 0 ? (
												<TemplateTag
													value={`+${item.score} 分`}
													type={
														TagType.Accept
													}
												/>
											) : (
												<TemplateTag
													value={`${item.score} 分`}
													type={
														TagType.Error
													}
												/>
											)}
										</div>
									</List.Item>
								);
							}}
						/>
					</InfiniteScroll>
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
