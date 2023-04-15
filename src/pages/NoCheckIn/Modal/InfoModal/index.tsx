import TemplateModal from "@/template/Modal";
import CrpInfo from "@/pages/WaitPeople/Modal/CrpInfoModal/CrpInfo";
import { useEffect, useState } from "react";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { getCrpById } from "@/api/ic";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
}) {
	const { open, setOpen, info } = props;
	const { dxbh } = info;
	const [crpInfo, setCrpInfo] = useState<CorrectionPeople>(
		{} as CorrectionPeople
	);

	useEffect(() => {
		getCrpById(
			dxbh,
			(res: CorrectionPeople) => {
				setCrpInfo(res);
			},
			(msg: String) => {
				console.log(msg);
			}
		);
	}, [dxbh]);

	return (
		<TemplateModal
			InfoDescriptions={<CrpInfo info={crpInfo} />}
			open={open}
			setOpen={setOpen}
		/>
	);
}
