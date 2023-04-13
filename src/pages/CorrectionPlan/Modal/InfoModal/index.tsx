import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { CrpPlan } from "@/entity/IC/CrpPlan";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
}) {
	const { open, setOpen, info } = props;

	const getInfos = (info: CrpPlan) => {
		return [
			{ label: "方案编号", value: info.id },
			{ label: "对象编号", value: info.dxbh },
			{ label: "姓名", value: info.xm },
			{ label: "方案附件", value: info.plan },
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"矫正方案"}
					info={info ? getInfos(info) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
