import { GMessage } from "@/utils/msg/GMsg";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import { getDate } from "@/utils/ie";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: any;
}) {
	const { open, setOpen, info } = props;

	const getInfos = (info: CrpAnnouncement) => {
		return [
			{ label: "对象编号", value: info.dxbh },
			{ label: "姓名", value: info.xm },
			{
				label: "宣告日期",
				value: getDate(info.xgrq),
			},
			{ label: "宣告音频", value: info.audio },
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"入矫宣告信息表"}
					info={info ? getInfos(info) : []}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
