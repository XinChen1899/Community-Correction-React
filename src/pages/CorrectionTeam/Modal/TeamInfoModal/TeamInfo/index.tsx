import { Card, Descriptions, List } from "antd";
import { Cteam } from "@/entity/IC/Cteam";

const CrpInfo = (props: { info: Cteam; workerMap: any }) => {
	const { info, workerMap } = props;
	console.log(info, workerMap);
	return (
		<Descriptions title="矫正小组信息" bordered layout="vertical">
			<Descriptions.Item label="矫正小组编号">
				{info.id}
			</Descriptions.Item>
			<Descriptions.Item label="小组名">
				{info.teamName}
			</Descriptions.Item>
			<Descriptions.Item label="组长姓名">
				{workerMap[info.monitor]}
			</Descriptions.Item>
			<Descriptions.Item label="小组成员">
				{
					<List
						grid={{ gutter: 16, column: 4 }}
						dataSource={info.workers}
						renderItem={(item) => (
							<List.Item>
								<Card title={workerMap[item]}>
									Card content
								</Card>
							</List.Item>
						)}
					/>
				}
			</Descriptions.Item>
		</Descriptions>
	);
};

export default CrpInfo;
