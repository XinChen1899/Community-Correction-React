import CrpInfo from "./TeamInfo";
import { DataType } from "../..";
import TemplateModal from "@/template/Modal";

export default function TeamInfoModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
	workerMap: any;
}) {
	const { open, setOpen, selectRecord, workerMap } = props;

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<CrpInfo
						info={selectRecord}
						workerMap={workerMap}
					/>
				}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
}
