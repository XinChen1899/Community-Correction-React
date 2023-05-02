import { CorrectionPeople } from "@/entity/IC/Crp";
import TemplateDescriptions from "@/template/Descriptions";
import {
	gjMap,
	hjlxMap,
	hyzkMap,
	jyjxqkMap,
	jzlbMap,
	map2Value,
	mzMap,
	whcdMap,
	xbMap,
	zzmmMap,
} from "@/utils";
import { getDate } from "@/utils/ie";
import { Avatar } from "antd";

const CrpInfo = (props: { info: CorrectionPeople }) => {
	const { info } = props;

	return (
		<TemplateDescriptions
			title={"社区矫正对象基本信息"}
			info={[
				{
					label: "照片",
					value: (
						<Avatar
							size={"large"}
							shape="square"
							src={info.zp}
						/>
					),
				},
				{ label: "社区矫正对象编号", value: info.dxbh },
				{
					label: "是否调查评估",
					value: info.sfdcpg ? "是" : "否",
				},
				{
					label: "矫正小组",
					value: `小组: ${info.team ? info.team : "无"}`,
				},
				{
					label: "矫正类别",
					value: map2Value(jzlbMap, info.jzlb),
				},
				{ label: "姓名", value: info.xm },
				{ label: "性别", value: map2Value(xbMap, info.xb) },
				{ label: "民族", value: map2Value(mzMap, info.mz) },
				{ label: "国籍", value: map2Value(gjMap, info.gj) },
				{
					label: "户籍类型",
					value: map2Value(hjlxMap, info.hjlx),
				},
				{ label: "社区矫正对象身份证", value: info.sfzhm },
				{ label: "出生日期", value: getDate(info.csrq) },
				{
					label: "文化程度",
					value: map2Value(whcdMap, info.whcd),
				},
				{
					label: "婚姻状况",
					value: map2Value(hyzkMap, info.hyzk),
				},
				{
					label: "就业就学情况",
					value: map2Value(jyjxqkMap, info.jyjxqk),
				},
				{
					label: "现政治面貌",
					value: map2Value(zzmmMap, info.xzzmm),
				},
				{ label: "现工作单位", value: info.xgzdw },
				{ label: "单位联系电话", value: info.dwlxdh },
				{ label: "现工作单位", value: info.xgzdw },
				{ label: "个人联系电话", value: info.grlxdh },
				{
					label: "有无家庭成员及主要社会关系",
					value: info.ywjtcyjzyshgx == "1" ? "是" : "否",
				},
			]}
		/>
	);
};

export default CrpInfo;
