import { GMessage } from "@/utils/msg/GMsg";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { CrpCategory } from "@/entity/Category/CategoryInfo";
import { map2Value, nsyjzlbMap } from "@/utils";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, gMsg } = props;

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
					info={getInfos(info)}
				/>
			}
			open={open}
			setOpen={setOpen}
			getAPI={undefined}
			recordId={undefined}
		/>
	);
}
