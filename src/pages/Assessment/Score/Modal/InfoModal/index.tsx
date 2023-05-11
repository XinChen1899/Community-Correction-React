import { getScoreDetail } from "@/api/assessment/score";
import { ScoreDetail } from "@/entity/Assessment/Score/ScoreDetail";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateTag, { MyTagType } from "@/template/Tag";
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
			console.log("aaa", data);
			if (data.status == "200") {
				const detail = data.data;
				const lists: ScoreDetail[] = detail.map(
					(item: any) => {
						return {
							reason: item.reason,
							score: item.score,
							date: item.date,
						};
					}
				);
				setScoreDetail({
					dxbh: info.dxbh,
					detail: lists.reverse(),
				});
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (err) => {
			gMsg.onError(err);
		},
		refreshDeps: [info.dxbh, tableUpdate],
		ready: info && open,
	});

	const getInfos = (detail: ScoreDetail) => {
		if (!detail || !open) return [];
		return [
			{ label: "对象编号", value: detail.dxbh },
			{ label: "对象姓名", value: info.xm },
			{ label: "总分", value: info.score },
			{
				label: "计分情况",
				span: 3,
				value: (
					<InfiniteScroll
						dataLength={
							detail.detail ? detail.detail.length : 0
						}
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
														MyTagType.Accept
													}
												/>
											) : (
												<TemplateTag
													value={`${item.score} 分`}
													type={
														MyTagType.Error
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
					info={getInfos(scoreDetail)}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
