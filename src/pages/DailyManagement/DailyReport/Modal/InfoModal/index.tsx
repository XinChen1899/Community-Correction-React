import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { Button, List } from "antd";
import { useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { ReportDetail } from "@/entity/Daily/report/ReportDetail";
import { getReportDetails } from "@/api/daily/report";
import { useRequest } from "ahooks";
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
	gMsg: GMessage;
	tableUpdate: boolean;
}) {
	const { open, setOpen, info, gMsg, tableUpdate } = props;
	const [reportDetail, setReportDetail] = useState<ReportDetail>(
		{} as ReportDetail
	);

	useRequest(() => getReportDetails(info.dxbh), {
		onSuccess: (response: any) => {
			const { data } = response;
			const list: any[] = data.data.map((d: any) => {
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
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [info.dxbh, tableUpdate],
		ready: info && info.dxbh != undefined,
	});

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
