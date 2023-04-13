import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { CheckDetail } from "@/entity/Daily/CheckDetail";
import { List } from "antd";
import { useEffect, useState } from "react";
import { getCheckDetails } from "@/api/daily/check";
import { GMessage } from "@/utils/msg/GMsg";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, gMsg } = props;
	const [checkDetail, setCheckDetail] = useState<CheckDetail>(
		{} as CheckDetail
	);
	// todo 获取到所有的打卡信息
	useEffect(() => {
		if (info && info.dxbh) {
			getCheckDetails(
				info.dxbh,
				(detail: any[]) => {
					const list: string[] = detail.map((d) => {
						return d.date;
					});

					setCheckDetail({
						dxbh: info.dxbh,
						checkList: list,
					} as CheckDetail);
					// console.log(getInfos(checkDetail));
				},
				(msg: string) => {
					gMsg.onError(msg);
				}
			);
		}
	}, []);

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
