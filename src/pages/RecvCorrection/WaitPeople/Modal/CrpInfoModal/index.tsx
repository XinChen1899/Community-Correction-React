import TemplateModal from "@/template/Modal";
import { DataType } from "../..";
import CrpInfo from "./CrpInfo";

export default function CrpInfoModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
}) {
	const { open, setOpen, selectRecord } = props;

	return (
		<TemplateModal
			InfoDescriptions={<CrpInfo info={selectRecord} />}
			open={open}
			setOpen={setOpen}
		/>
	);
}
