import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { CheckDetail } from "@/entity/Daily/check/CheckDetail";
import { List } from "antd";
import { useEffect, useState } from "react";
import { getCheckDetails } from "@/api/daily/check";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
	gMsg: GMessage;
	tableUpdate: boolean;
}) {
	const { open, setOpen, info, gMsg, tableUpdate } = props;
	const [checkDetail, setCheckDetail] = useState<CheckDetail>(
		{} as CheckDetail
	);
	// todo 获取到所有的打卡信息
	useRequest(() => getCheckDetails(info.dxbh), {
		onSuccess: (response: any) => {
			const { data } = response;
			const list: string[] = data.data.map((d: any) => {
				return d.date;
			});

			setCheckDetail({
				dxbh: info.dxbh,
				checkList: list,
			} as CheckDetail);
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [info.dxbh, tableUpdate],
		ready: info && info.dxbh != undefined,
	});

	const getInfos = (info: CheckDetail) => {
		return [
			{ label: "对象编号", value: info.dxbh },
			{
				label: "打卡日期",
				value: (
					<List
						bordered
						dataSource={info.checkList}
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
					info={checkDetail ? getInfos(checkDetail) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
