import CrpInfo from "./TeamInfo";
import { DataType } from "../..";
import { CrTeam } from "@/entity/IC/CrTeam";
import TemplateModal from "@/template/Modal";
import { useEffect, useState } from "react";

export default function TeamInfoModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
	workerMap: any;
}) {
	const { open, setOpen, selectRecord, workerMap } = props;

	const [info, setInfo] = useState<CrTeam>({} as CrTeam);

	useEffect(() => {
		const temp: CrTeam = {
			id: selectRecord.id,
			teamName: selectRecord.teamName,
			monitor: selectRecord.monitor,
			teamNumber: selectRecord.teamNumber,
			workers: selectRecord.workers ? selectRecord.workers : [],
		};
		setInfo(temp);
	}, [selectRecord.id]);

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<CrpInfo info={info} workerMap={workerMap} />
				}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
}
