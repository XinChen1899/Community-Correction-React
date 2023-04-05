import { Card, Modal, Space } from "antd";
import CrpInfo from "./CrpInfo";
import { DataType } from "../..";
import { CorrectionPeople } from "@/entity/IC/Crp";

export default function CrpInfoModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
}) {
	const { open, setOpen, selectRecord } = props;

	const info: CorrectionPeople = {
		sqjzdxbh: "",
		sfdcpg: false,
		jzlb: "",
		xm: selectRecord.name,
		xb: "",
		mz: "",
		gj: "",
		hjlx: "",
		sfzhm: "",
		csrq: "",
		whcd: "",
		hyzk: "",
		jyjxqk: "",
		xzzmm: "",
		xgzdw: "",
		dwlxdh: "",
		grlxdh: "",
		ywjtcyjzyshgx: "",
		zp: "",
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
