import { CrpPlan } from "@/entity/IC/CrpPlan";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { jzlbMap, map2Value, sfcnMap } from "@/utils";
import { DataType } from "../..";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
}) {
	const { open, setOpen, info } = props;

	const getInfos = (info: CrpPlan) => {
		return [
			{ label: "方案编号", value: info.id },
			{ label: "方案名称", value: info.famc },
			{ label: "对象编号", value: info.dxbh },
			{ label: "姓名", value: info.xm },
			{
				label: "矫正类别",
				value: map2Value(jzlbMap, info.jzlb),
			},
			{
				label: "是否成年",
				value: map2Value(sfcnMap, info.sfcn),
			},
			{ label: "监督管理措施", value: info.jdglcs },
			{ label: "教育矫正措施", value: info.jyjzcs },
			{ label: "帮困扶助措施", value: info.bkfzcs },
			{ label: "其他措施", value: info.qtcs },
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"矫正方案信息"}
					info={info != undefined ? getInfos(info) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
