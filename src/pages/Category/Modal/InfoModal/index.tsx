import { GMessage } from "@/utils/msg/GMsg";
import { CategoryInfo } from "@/entity/Category/CategoryInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { useEffect, useState } from "react";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	dxbh: string;
	gMsg: GMessage;
}) {
	const { open, setOpen, dxbh, gMsg } = props;
	const [infos, setInfos] = useState<any[]>([]);

	const getInfos = (info: CategoryInfo) => {
		return [
			{ label: "对象编号", value: info.dxbh },
			{ label: "姓名", value: info.xm },
			{
				label: "矫正类别",
				value: info.jzlb,
			},
		];
	};

	useEffect(() => {
		setInfos(getInfos({ dxbh, xm: "xxx", jzlb: "xxx" }));
	}, []);

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"矫正对象类别信息"}
					info={infos}
				/>
			}
			open={open}
			setOpen={setOpen}
			getAPI={(id: string) => {
				// getExitInfoByDXBH(
				// 	id,
				// 	(data: any) => {
				// 		setInfos(getInfos(data));
				// 		gMsg.onSuccess("获取出入境信息成功！");
				// 	},
				// 	(err: any) => {
				// 		setInfos([]);
				// 		gMsg.onError("获取出入境信息失败！" + err);
				// 	}
				// );
			}}
			recordId={dxbh}
		/>
	);
}
