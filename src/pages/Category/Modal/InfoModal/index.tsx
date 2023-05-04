import { CrpCategory } from "@/entity/Category/CategoryInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { map2Value, nsyjzlbMap } from "@/utils";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: CrpCategory;
}) {
	const { open, setOpen, info } = props;

	const getInfos = (info: CrpCategory) => {
		return [
			{ label: "对象编号", value: info.dxbh },
			{ label: "姓名", value: info.xm },
			{
				label: "管理类别",
				value: map2Value(nsyjzlbMap, info.gllb),
			},
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"矫正对象类别信息"}
					info={info ? getInfos(info) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
