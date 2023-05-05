import { getCheckDetails } from "@/api/daily/check";
import { CheckDetail } from "@/entity/Daily/check/CheckDetail";
import { CheckInfo } from "@/entity/Daily/check/CheckInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { List } from "antd";
import { useState } from "react";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: CheckInfo;
	gMsg: GMessage;
	tableUpdate: boolean;
}) {
	const { open, setOpen, info, gMsg, tableUpdate } = props;
	const [checkDetail, setCheckDetail] = useState<CheckDetail>({
		dxbh: "",
	} as CheckDetail);

	useRequest(() => getCheckDetails(info.dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				const list: string[] = data.data.map((d: any) => {
					return d.date;
				});

				setCheckDetail({
					dxbh: info.dxbh,
					checkList: list,
				} as CheckDetail);
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [info.dxbh, tableUpdate],
		ready: open && info && info.dxbh != undefined,
	});

	const getInfos = (detail: CheckDetail) => {
		if (!open || !detail) return [];
		return [
			{ label: "对象编号", value: detail.dxbh },
			{ label: "已报到次数", value: info.count },
			{
				label: "打卡日期",
				value: (
					<List
						bordered
						dataSource={detail.checkList}
						renderItem={(item) => {
							return <List.Item>{item}</List.Item>;
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
					title={"报到信息"}
					info={getInfos(checkDetail)}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
