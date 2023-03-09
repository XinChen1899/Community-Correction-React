import React from "react";
import { Descriptions } from "antd";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";

const TaskInfo = (props: { selectTask: DataType }) => {
	const { selectTask } = props;

	// todo 发起api请求完整的调查评估信息

	return (
		<div>
			<Descriptions title="调查评估信息" bordered>
				<Descriptions.Item label="委托编号" span={1.5}>12345</Descriptions.Item>
				<Descriptions.Item label="委托单位" span={1.5}>司法所</Descriptions.Item>
				<Descriptions.Item label="调查评估委托函" span={1.5}>委托函</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象的类型" span={1.5}>类型</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象姓名" span={1.5}>
					{selectTask.name}
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象身份证" span={1.5}>
					330322222222222222
				</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象性别" span={1.5}>{selectTask.sex}</Descriptions.Item>
				<Descriptions.Item label="被调查评估对象出生日期" span={1.5}>2000/1/1</Descriptions.Item>
				{/*<Descriptions.Item label="被调查评估对象居住地地址" span={1.5}>{selectTask.address}</Descriptions.Item>*/}
				<Descriptions.Item label="被调查评估对象工作单位" span={1.5}>$60.00</Descriptions.Item>
				<Descriptions.Item label="罪名" span={1.5}>抢劫</Descriptions.Item>
				<Descriptions.Item label="原判判刑" span={1.5}>1个月</Descriptions.Item>
				<Descriptions.Item label="原判刑期开始日期" span={1.5}>2001/1/1</Descriptions.Item>
				<Descriptions.Item label="原判刑期结束日期" span={1.5}>2001/1/2</Descriptions.Item>
				<Descriptions.Item label="原判刑罚" span={1.5}>$60.00</Descriptions.Item>
				<Descriptions.Item label="附加邢" span={1.5}> $60.00</Descriptions.Item>
				<Descriptions.Item label="判决机关" span={1.5}>$60.00</Descriptions.Item>
				<Descriptions.Item label="判决日期">$60.00</Descriptions.Item>
				<Descriptions.Item label="拟使用矫正类别">$60.00</Descriptions.Item>
				<Descriptions.Item label="接收委托的县级社区矫正机构" span={1.5}>$60.00</Descriptions.Item>
				<Descriptions.Item label="调查评估意见审核人" span={1.5}>$60.00</Descriptions.Item>
				<Descriptions.Item label="调查评估意见" span={3}>$60.00</Descriptions.Item>
				<Descriptions.Item label="调查评估意见书">
					附件
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default TaskInfo;