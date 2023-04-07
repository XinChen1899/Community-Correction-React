import { Descriptions } from "antd";
import { transform } from "@/coderepo/ie";
import { CorrectionPeople } from "@/entity/IC/Crp";

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
				{info.sfdcpg}
			</Descriptions.Item>
			<Descriptions.Item label="矫正类别">
				{info.jzlb}
			</Descriptions.Item>
			<Descriptions.Item label="姓名">
				{info.xm}
			</Descriptions.Item>
			<Descriptions.Item label="性别">
				{info.xb}
			</Descriptions.Item>
			<Descriptions.Item label="民族">
				{info.mz}
			</Descriptions.Item>
			<Descriptions.Item label="国籍">
				{info.gj}
			</Descriptions.Item>
			<Descriptions.Item label="户籍类型">
				{/* {transform("bgrxb", info.bgrxb)} */}
				{info.hjlx}
			</Descriptions.Item>
			<Descriptions.Item label="社区矫正对象身份证">
				{info.sfzhm}
			</Descriptions.Item>
			<Descriptions.Item label="出生日期">
				{info.csrq.toString()}
			</Descriptions.Item>
			<Descriptions.Item label="文化程度">
				{info.whcd}
			</Descriptions.Item>
			<Descriptions.Item label="婚姻状况">
				{/* {transform("zm", info.zm)} */}
				{info.hyzk}
			</Descriptions.Item>
			<Descriptions.Item label="就业就学情况">
				{info.jyjxqk}
			</Descriptions.Item>
			<Descriptions.Item label="现政治面貌">
				{info.xzzmm}
			</Descriptions.Item>
			<Descriptions.Item label="现工作单位">
				{info.xgzdw}
			</Descriptions.Item>
			<Descriptions.Item label="单位联系电话">
				{/* {transform("ypxf", info.ypxf)} */}
				{info.dwlxdh}
			</Descriptions.Item>
			<Descriptions.Item label="个人联系电话">
				{/* {transform("fjx", info.fjx)} */}
				{info.grlxdh}
			</Descriptions.Item>
			<Descriptions.Item label="有无家庭成员及主要社会关系">
				{/* {transform("pjjg", info.pjjg)} */}
				{info.ywjtcyjzyshgx}
			</Descriptions.Item>
			<Descriptions.Item label="照片">
				{info.zp}
			</Descriptions.Item>
		</Descriptions>
	);
};

export default CrpInfo;
