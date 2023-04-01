import React from "react";
import { Descriptions } from "antd";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";

const TaskInfo = (props: { info: IEVisitInfo }) => {
	const { info } = props;

	return (
		<div>
			<Descriptions title="调查评估走访信息" bordered>
				<Descriptions.Item label="委托编号">{info.WTBH}</Descriptions.Item>
				<Descriptions.Item label="被调查人姓名">{info.BDCRXM}</Descriptions.Item>
				<Descriptions.Item label="与被调查评估对象关系">{info.YBGRGX}</Descriptions.Item>
				<Descriptions.Item label="调查事项">{info.DCSX}</Descriptions.Item>
				<Descriptions.Item label="调查时间">
					{info.DCSJ}
				</Descriptions.Item>
				<Descriptions.Item label="调查地点">
					{info.DCDD}
				</Descriptions.Item>
				<Descriptions.Item label="调查单位">{info.DCDWSFS}</Descriptions.Item>
				<Descriptions.Item label="调查人">{info.DCR}</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default TaskInfo;