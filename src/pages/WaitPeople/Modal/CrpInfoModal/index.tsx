import { Card, Modal, Space } from "antd";
import CrpInfo from "./CrpInfo";
import { DataType } from "../..";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { useEffect, useState } from "react";
import { getCrpById } from "@/api/ic";
import { GMessage } from "@/coderepo/msg/GMsg";

const defaultCrp: CorrectionPeople = {
	sqjzdxbh: "",
	sfdcpg: false,
	jzlb: "",
	xm: "null",
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
export default function CrpInfoModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
	gMsg: GMessage;
	infoUpdate: any;
}) {
	const { open, setOpen, selectRecord, gMsg, infoUpdate } = props;
	const { dxbh } = selectRecord;

	const [crp, setCrp] = useState<CorrectionPeople>(defaultCrp);
	useEffect(() => {
		if (dxbh) {
			getCrpById(dxbh, setCrp, () =>
				gMsg.onError("找不到此对象!")
			);

			console.log(crp);
		}
	}, [dxbh, infoUpdate]);

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
						<CrpInfo info={crp} />
					</Card>
				</Space>
			</Card>
		</Modal>
	);
}
