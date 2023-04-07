import CrpInfo from "./TeamInfo";
import { DataType } from "../..";
import { CorrectionTeam } from "@/entity/IC/Cteam";
import TemplateModal from "@/template/Modal";

export default function TeamInfoModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
}) {
	const { open, setOpen, selectRecord } = props;

	const info: CorrectionTeam = {
		id: selectRecord.id,
		teamName: selectRecord.teamName,
		monitorName: selectRecord.monitorName,
		teamNumber: selectRecord.teamNumber,
		workers: [],
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={<CrpInfo info={info} />}
				open={open}
				setOpen={setOpen}
				// recordId={dxbh}
				// infoUpdate={infoUpdate}
				getAPI={() => {}}
			/>
		</>
	);
}
