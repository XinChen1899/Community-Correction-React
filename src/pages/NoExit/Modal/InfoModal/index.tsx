import { getExitInfoByDXBH } from "@/api/NoExit";
import { GMessage } from "@/coderepo/msg/GMsg";
import { Exit } from "@/entity/NoExit/Exit";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { useState } from "react";

/**
 * 查询所有社矫对象（可选择类别：在
矫、解矫）关于出入境方面的情况：
是否已同级报备、证件是否已代管/
归还/收缴/吊销/作废、是否有出境
风险、是否已办边控手续（初态为：
未边控）。
 * @returns 
 */
export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	dxbh: string;
	gMsg: GMessage;
}) {
	const { open, setOpen, dxbh, gMsg } = props;
	const exit: Exit = {
		dxbh: dxbh,
		xm: "xxx",
		bb: false,
		zj: "代管/归还/收缴/吊销/作废",
		bk: false,
	};
	const [infos, setInfos] = useState<any[]>([]);

	const getInfos = (exitInfo: Exit) => {
		return [
			{ label: "对象编号", value: exitInfo.dxbh },
			{ label: "姓名", value: exitInfo.xm },
			{
				label: "报备状态",
				value: exitInfo.bb ? "已报备" : "待报备",
			},
			{ label: "证件", value: exit.zj },
			{
				label: "边控状态",
				value: exitInfo.bk ? "已边控" : "未边控",
			},
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"出入境情况表"}
					info={infos}
				/>
			}
			open={open}
			setOpen={setOpen}
			getAPI={(id: string) => {
				getExitInfoByDXBH(
					id,
					(data: any) => {
						setInfos(getInfos(data));
						gMsg.onSuccess("获取出入境信息成功！");
					},
					(err: any) => {
						setInfos([]);
						gMsg.onError("获取出入境信息失败！" + err);
					}
				);
			}}
			recordId={dxbh}
		/>
	);
}
