import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { CheckDetail } from "@/entity/Daily/check/CheckDetail";
import { Button, List } from "antd";
import { useEffect, useState } from "react";
import { getCheckDetails } from "@/api/daily/check";
import { GMessage } from "@/utils/msg/GMsg";
import { ReportDetail } from "@/entity/Daily/report/ReportDetail";
import { getReportDetails } from "@/api/daily/report";
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, gMsg } = props;
	const [reportDetail, setReportDetail] = useState<ReportDetail>(
		{} as ReportDetail
	);
	useEffect(() => {
		if (info && info.dxbh) {
			getReportDetails(
				info.dxbh,
				(detail: any[]) => {
					const list: any[] = detail.map((d) => {
						return {
							bg: d.bg,
							date: d.date,
						};
					});
					setReportDetail({
						dxbh: info.dxbh,
						reportList: list,
					} as ReportDetail);
				},
				(err: any) => {
					gMsg.onError(err);
				}
			);
		}
	}, [info.dxbh]);

	const getInfos = (info: ReportDetail) => {
		return [
			{ label: "对象编号", value: info.dxbh },
			{
				label: "报告列表",
				value: (
					<List
						bordered
						dataSource={info.reportList}
						renderItem={(item) => {
							return (
								<List.Item>
									{item.bg}--{item.date}
									<Button type="link">下载</Button>
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
					title={"报告信息"}
					info={reportDetail ? getInfos(reportDetail) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
