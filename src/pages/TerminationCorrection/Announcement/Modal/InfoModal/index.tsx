import { TermAnnounce } from "@/entity/Termination/TermAnnounce";
import { Audio } from "@/template/Audio";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { getDate } from "@/utils/ie";

export default function InfoModal(props: {
	open: boolean;
	setOpen: any;
	info: TermAnnounce;
}) {
	const { open, setOpen, info } = props;

	const getInfos = (info: TermAnnounce) => {
		if (!open || !info) return [];
		return [
			{ label: "对象编号", value: info.dxbh },
			{ label: "姓名", value: info.xm },
			{
				label: "宣告日期",
				value: getDate(info.xgrq),
			},
			{
				label: "宣告音频",
				value: <Audio src={info.audio} />,
				span: 3,
			},
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateDescriptions
					title={"终止矫正宣告信息表"}
					info={getInfos(info)}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
