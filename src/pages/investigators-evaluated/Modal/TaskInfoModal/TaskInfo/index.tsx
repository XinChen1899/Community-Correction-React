import React from "react";
import { Descriptions } from "antd";
import { IEInfo } from "@/entity/IE/IEInfo";

const TaskInfo = (props: { info: IEInfo }) => {
	const { info } = props;


	return (
		<div style={{ width: "900px" }}>
			<Descriptions title="调查评估信息" bordered>
				<Descriptions.Item label="委托编号" span={1.5}>
					{info.wtbh}
				</Descriptions.Item>
				<Descriptions.Item label="委托单位" span={1.5}>
					{info.wtdw}
				</Descriptions.Item>
				<Descriptions.Item label="调查评估委托函" span={1.5}>
					{info.wtdch}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象的类型" span={1.5}>
					{info.bdcpgrdlx}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象姓名" span={1.5}>
					{info.bgrxm}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象身份证" span={1.5}>
					{info.bgrsfzh}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象性别" span={1.5}>
					{info.bgrxb}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象出生日期" span={1.5}>
					{info.bgrcsrq}
				</Descriptions.Item>
				{<Descriptions.Item label="被调查评估对象居住地地址" span={1.5}>
					{info.bgrjzddz}
				</Descriptions.Item>}
				<Descriptions.Item label="被调查评估对象工作单位" span={1.5}>{info.bgrgzdw}</Descriptions.Item>
				<Descriptions.Item label="罪名" span={1.5}>{info.zm}</Descriptions.Item>
				<Descriptions.Item label="原判判刑" span={1.5}>{info.ypxq}</Descriptions.Item>
				<Descriptions.Item label="原判刑期开始日期" span={1.5}>{info.ypxqksrq}</Descriptions.Item>
				<Descriptions.Item label="原判刑期结束日期" span={1.5}>{info.ypxqjsrq}</Descriptions.Item>
				<Descriptions.Item label="原判刑罚" span={1.5}>{info.ypxf}</Descriptions.Item>
				<Descriptions.Item label="附加邢" span={1.5}>{info.fjx}</Descriptions.Item>
				<Descriptions.Item label="判决机关" span={1.5}>{info.pjjg}</Descriptions.Item>
				<Descriptions.Item label="判决日期">{info.pjrq}</Descriptions.Item>
				<Descriptions.Item label="拟使用矫正类别">{info.nsyjzlb}</Descriptions.Item>
				<Descriptions.Item label="接收委托的县级社区矫正机构" span={1.5}>{info.dcdwxqj}</Descriptions.Item>
				<Descriptions.Item label="调查评估意见审核人" span={1.5}>{info.dcyjshr}</Descriptions.Item>
				<Descriptions.Item label="调查评估意见" span={3}>{info.dcpgyj}</Descriptions.Item>
				<Descriptions.Item label="调查评估意见书">
					附件
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default TaskInfo;