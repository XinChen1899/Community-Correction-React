import TemplateModal from "@/template/Modal";
import CrpInfo from "@/pages/WaitPeople/Modal/CrpInfoModal/CrpInfo";
import { useState } from "react";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { getCrpByDxbh } from "@/api/ic";
import { DataType } from "..";
import { useRequest } from "ahooks";
import { GMessage } from "@/utils/msg/GMsg";

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
	useRequest((dxbh) => getCrpByDxbh(dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setCrpInfo(data.data);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		refreshDeps: [dxbh],
	});

	return (
		<TemplateModal
			InfoDescriptions={<CrpInfo info={crpInfo} />}
			open={open}
			setOpen={setOpen}
		/>
	);
}
