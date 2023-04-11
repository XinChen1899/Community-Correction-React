import CrpInfo from "./TeamInfo";
import { DataType } from "../..";
import { Cteam } from "@/entity/IC/Cteam";
import TemplateModal from "@/template/Modal";
import { useEffect, useState } from "react";

export default function TeamInfoModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
	workerMap: any;
}) {
	const { open, setOpen, selectRecord, workerMap } = props;

	const [info, setInfo] = useState<Cteam>({} as Cteam);

	useEffect(() => {
		const temp: Cteam = {
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
				getAPI={() => {}}
				recordId={undefined}
			/>
		</>
	);
}
