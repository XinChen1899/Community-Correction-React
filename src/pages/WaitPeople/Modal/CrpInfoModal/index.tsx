import { Card, Modal, Space } from "antd";
import CrpInfo from "./CrpInfo";
import { DataType } from "../..";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { useEffect, useState } from "react";
import { getCrpById } from "@/api/ic";
import { GMessage } from "@/utils/msg/GMsg";
import TemplateModal from "@/template/Modal";

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

	return (
		<>
			<TemplateModal
				InfoDescriptions={<CrpInfo info={crp} />}
				open={open}
				setOpen={setOpen}
				recordId={dxbh}
				infoUpdate={infoUpdate}
				getAPI={(id: any) => {
					getCrpById(id, setCrp, () =>
						gMsg.onError("找不到此对象!")
					);
					console.log(crp);
				}}
				confirmLoading={false}
			/>
		</>
	);
}
