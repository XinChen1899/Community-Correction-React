import React from "react";
import { Descriptions } from "antd";
import { IEInfo } from "@/entity/IE/IEInfo";

const TaskInfo = (props: { info: IEInfo }) => {
	const { info } = props;


	return (
		<div>
			<Descriptions title="调查评估信息" bordered>
				<Descriptions.Item label="委托编号" span={1.5}>
					{info.WTBH}
				</Descriptions.Item>
				<Descriptions.Item label="委托单位" span={1.5}>
					{info.WTDW}
				</Descriptions.Item>
				<Descriptions.Item label="调查评估委托函" span={1.5}>
					{info.WTDCH}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象的类型" span={1.5}>
					{info.BDCPGRDLX}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象姓名" span={1.5}>
					{info.BGRXM}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象身份证" span={1.5}>
					{info.BGRSFZH}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象性别" span={1.5}>
					{info.BGRXB}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象出生日期" span={1.5}>
					{info.BGRCSRQ}
				</Descriptions.Item>
				{<Descriptions.Item label="被调查评估对象居住地地址" span={1.5}>
					{info.BGRJZDDZ}
				</Descriptions.Item>}
				<Descriptions.Item label="被调查评估对象工作单位" span={1.5}>{info.BGRGZDW}</Descriptions.Item>
				<Descriptions.Item label="罪名" span={1.5}>{info.ZM}</Descriptions.Item>
				<Descriptions.Item label="原判判刑" span={1.5}>{info.YPXQ}</Descriptions.Item>
				<Descriptions.Item label="原判刑期开始日期" span={1.5}>{info.YPXQKSRQ}</Descriptions.Item>
				<Descriptions.Item label="原判刑期结束日期" span={1.5}>{info.YPXQJSRQ}</Descriptions.Item>
				<Descriptions.Item label="原判刑罚" span={1.5}>{info.YPXF}</Descriptions.Item>
				<Descriptions.Item label="附加邢" span={1.5}>{info.FJX}</Descriptions.Item>
				<Descriptions.Item label="判决机关" span={1.5}>{info.PJJG}</Descriptions.Item>
				<Descriptions.Item label="判决日期">{info.PJRQ}</Descriptions.Item>
				<Descriptions.Item label="拟使用矫正类别">{info.NSYJZLB}</Descriptions.Item>
				<Descriptions.Item label="接收委托的县级社区矫正机构" span={1.5}>{info.DCDWXQJ}</Descriptions.Item>
				<Descriptions.Item label="调查评估意见审核人" span={1.5}>{info.DCYJSHR}</Descriptions.Item>
				<Descriptions.Item label="调查评估意见" span={3}>{info.DCPGYJ}</Descriptions.Item>
				<Descriptions.Item label="调查评估意见书">
					附件
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default TaskInfo;