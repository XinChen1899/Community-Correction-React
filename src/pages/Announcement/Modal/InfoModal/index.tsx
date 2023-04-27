import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import { getDate } from "@/utils/ie";

function Audio(props: { src: string }) {
	const { src } = props;
	return (
		<div>
			<audio controls src={src}>
				<a href={src}>Download audio</a>
			</audio>
		</div>
	);
}

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
			{
				label: "宣告音频",
				value: <Audio src={info.audio} />,
			},
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
