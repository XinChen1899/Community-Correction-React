import { Descriptions } from "antd";
import { CorrectionPeople } from "@/entity/IC/Crp";
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
} from "@/utils";

const CrpInfo = (props: { info: CorrectionPeople }) => {
	const { info } = props;

	return (
		<Descriptions
			title="社区矫正对象基本信息"
			bordered
			layout="vertical">
			<Descriptions.Item label="社区矫正对象编号">
				{info.sqjzdxbh}
			</Descriptions.Item>
			<Descriptions.Item label="是否调查评估">
				{info.sfdcpg ? "是" : "否"}
			</Descriptions.Item>
			<Descriptions.Item label="矫正小组">
				{info.team}
			</Descriptions.Item>
			<Descriptions.Item label="矫正类别">
				{map2Value(jzlbMap, info.jzlb)}
			</Descriptions.Item>
			<Descriptions.Item label="姓名">
				{info.xm}
			</Descriptions.Item>
			<Descriptions.Item label="性别">
				{map2Value(xbMap, info.xb)}
			</Descriptions.Item>
			<Descriptions.Item label="民族">
				{map2Value(mzMap, info.mz)}
			</Descriptions.Item>
			<Descriptions.Item label="国籍">
				{map2Value(gjMap, info.gj)}
			</Descriptions.Item>
			<Descriptions.Item label="户籍类型">
				{map2Value(hjlxMap, info.hjlx)}
			</Descriptions.Item>
			<Descriptions.Item label="社区矫正对象身份证">
				{info.sfzhm}
			</Descriptions.Item>
			<Descriptions.Item label="出生日期">
				{info.csrq ? info.csrq.toString() : null}
			</Descriptions.Item>
			<Descriptions.Item label="文化程度">
				{map2Value(whcdMap, info.whcd)}
			</Descriptions.Item>
			<Descriptions.Item label="婚姻状况">
				{map2Value(hyzkMap, info.hyzk)}
			</Descriptions.Item>
			<Descriptions.Item label="就业就学情况">
				{map2Value(jyjxqkMap, info.jyjxqk)}
			</Descriptions.Item>
			<Descriptions.Item label="现政治面貌">
				{info.xzzmm}
			</Descriptions.Item>
			<Descriptions.Item label="现工作单位">
				{info.xgzdw}
			</Descriptions.Item>
			<Descriptions.Item label="单位联系电话">
				{info.dwlxdh}
			</Descriptions.Item>
			<Descriptions.Item label="个人联系电话">
				{info.grlxdh}
			</Descriptions.Item>
			<Descriptions.Item label="有无家庭成员及主要社会关系">
				{info.ywjtcyjzyshgx}
			</Descriptions.Item>
			<Descriptions.Item label="照片">
				{info.zp}
			</Descriptions.Item>
		</Descriptions>
	);
};

export default CrpInfo;
