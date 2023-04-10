import { IEInfo } from "@/entity/IE/IEInfo";
import {
	bdcpgrdlxMap,
	fjxMap,
	map2Value,
	nsyjzlbMap,
	pjjgMap,
	wtdwMap,
	xbMap,
	ypxfMap,
	zmMap,
} from "@/utils";
import TemplateDescriptions from "@/template/Descriptions";

const TaskInfo = (props: { info: IEInfo }) => {
	const { info } = props;

	return (
		<TemplateDescriptions
			title={"调查评估信息表"}
			info={[
				{ label: "委托编号", value: info.wtbh },
				{
					label: "委托单位",
					value: map2Value(wtdwMap, info.wtdw),
				},
				{ label: "调查评估委托函", value: info.wtdch },
				{
					label: "被调查评估对象的类型",
					value: map2Value(bdcpgrdlxMap, info.bdcpgrdlx),
				},
				{ label: "被调查评估对象姓名", value: info.bgrxm },
				{
					label: "被调查评估对象身份证",
					value: info.bgrsfzh,
				},
				{
					label: "被调查评估对象性别",
					value: map2Value(xbMap, info.bgrxb),
				},
				{
					label: "被调查评估对象出生日期",
					value: info.bgrcsrq.toString(),
				},
				{
					label: "被调查评估对象居住地地址",
					value: info.bgrjzddz,
				},
				{
					label: "被调查评估对象工作单位",
					value: info.bgrgzdw,
				},
				{
					label: "罪名",
					value: map2Value(zmMap, info.zm),
				},
				{
					label: "原判判刑",
					value: info.ypxq,
				},
				{
					label: "原判刑期开始日期",
					value: info.ypxqksrq.toString(),
				},
				{
					label: "原判刑期结束日期",
					value: info.ypxqjsrq.toString(),
				},
				{
					label: "原判刑罚",
					value: map2Value(ypxfMap, info.ypxf),
				},
				{
					label: "附加邢",
					value: map2Value(fjxMap, info.fjx),
				},
				{
					label: "判决机关",
					value: map2Value(pjjgMap, info.pjjg),
				},
				{
					label: "判决日期",
					value: info.pjrq.toString(),
				},
				{
					label: "拟使用矫正类别",
					value: map2Value(nsyjzlbMap, info.nsyjzlb),
				},
				{
					label: "接收委托的县级社区矫正机构",
					value: info.dcdwxqj,
				},
				{
					label: "调查评估意见审核人",
					value: info.dcyjshr,
				},
				{
					label: "调查评估意见",
					value: info.dcpgyj,
				},
				{
					label: "调查评估意见书",
					value: "见附件",
				},
			]}
		/>
	);
};

export default TaskInfo;
