import { downloadDocx, getReportDetails } from "@/api/daily/report";
import { ReportDetail } from "@/entity/Daily/report/ReportDetail";
import { ReportInfo } from "@/entity/Daily/report/ReportInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { download } from "@/utils/download";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, List, Space } from "antd";
import { useState } from "react";
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: ReportInfo;
	gMsg: GMessage;
	tableUpdate: boolean;
}) {
	const { open, setOpen, info, gMsg, tableUpdate } = props;
	const [reportDetail, setReportDetail] = useState<ReportDetail>(
		{} as ReportDetail
	);

	const { run: runDownloadDocx } = useRequest(
		(name) => downloadDocx(name),
		{
			onSuccess: ({ data }) => {
				gMsg.onSuccess("下载成功!");
				download(data, info.dxbh + "的报告.doc");
			},
			manual: true,
			debounceWait: 500,
		}
	);

	useRequest(() => getReportDetails(info.dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
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
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [info.dxbh, tableUpdate],
		ready: open && info != undefined,
	});

	const getInfos = (detail: ReportDetail) => {
		if (!open || !detail) return [];
		return [
			{ label: "对象编号", value: detail.dxbh },
			{
				label: "报告列表",
				value: (
					<List
						bordered
						dataSource={detail.reportList}
						renderItem={(item, idx) => {
							return (
								<List.Item>
									<Space>
										{idx + 1}|
										<Button
											type="link"
											onClick={() =>
												runDownloadDocx(
													item.bg
												)
											}>
											下载
										</Button>
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
					title={"报告信息"}
					info={getInfos(reportDetail)}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
