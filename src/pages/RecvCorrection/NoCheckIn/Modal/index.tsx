import { getCrpByDxbh } from "@/api/ic";
import { CorrectionPeople } from "@/entity/IC/Crp";
import CrpInfo from "@/pages/RecvCorrection/WaitPeople/Modal/CrpInfoModal/CrpInfo";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { useState } from "react";
import { DataType } from "..";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, gMsg } = props;
	const { dxbh } = info;
	const [crpInfo, setCrpInfo] = useState<CorrectionPeople>(
		{} as CorrectionPeople
	);
	useRequest(() => getCrpByDxbh(info.dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setCrpInfo(data.data);
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		refreshDeps: [dxbh],
		ready: open && info.dxbh != undefined && info.dxbh != "",
	});

	return (
		<TemplateModal
			InfoDescriptions={<CrpInfo info={crpInfo} />}
			open={open}
			setOpen={setOpen}
		/>
	);
}
