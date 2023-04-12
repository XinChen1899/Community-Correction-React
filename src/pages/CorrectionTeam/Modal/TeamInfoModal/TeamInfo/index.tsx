import { Card, Descriptions, List } from "antd";
import { CrTeam } from "@/entity/IC/CrTeam";

const CrpInfo = (props: { info: CrTeam; workerMap: any }) => {
	const { info, workerMap } = props;
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
								<Card
									title={`人员编号为: ${item}`}
									hoverable>
									{workerMap[item]}
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
