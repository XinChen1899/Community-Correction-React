import { Card, Modal, Space } from "antd";
import CrpInfo from "./TeamInfo";
import { DataType } from "../..";
import { CorrectionTeam } from "@/entity/IC/Cteam";

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
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			onOk={() => setOpen(false)}
			onCancel={() => setOpen(false)}>
			<Card>
				<Space direction={"vertical"}>
					<Card hoverable style={{ width: "900px" }}>
						<CrpInfo info={info} />
					</Card>
				</Space>
			</Card>
		</Modal>
	);
}
