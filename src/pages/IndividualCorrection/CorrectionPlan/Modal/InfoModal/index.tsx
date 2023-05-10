import { CrpPlan } from "@/entity/IC/CrpPlan";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { jzlbMap, map2Value } from "@/utils";
import { DataType } from "../..";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
}) {
	const { open, setOpen, info } = props;

	const getInfos = (info: CrpPlan) => {
		if (!open || !info) return [];
		return [
			{ label: "方案编号", value: info.id },
			{ label: "方案名称", value: info.famc },
			{ label: "对象编号", value: info.dxbh },
			{ label: "姓名", value: info.xm },
			{
				label: "矫正类别",
				value: map2Value(jzlbMap, info.jzlb),
			},
			{ label: "矫正小组", value: info.team },
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"矫正方案信息"}
					info={getInfos(info)}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
