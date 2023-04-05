import { Descriptions } from "antd";
import { CorrectionTeam } from "@/entity/IC/Cteam";

const CrpInfo = (props: { info: CorrectionTeam }) => {
	const { info } = props;

	return (
		<Descriptions title="矫正小组信息" bordered layout="vertical">
			<Descriptions.Item label="矫正小组编号">
				{info.id}
			</Descriptions.Item>
			<Descriptions.Item label="小组名">
				{info.teamName}
			</Descriptions.Item>
			<Descriptions.Item label="组长姓名">
				{info.monitorName}
			</Descriptions.Item>
			<Descriptions.Item label="小组成员">
				{info.workers.map((rec, idx) => {
					return <div>{rec.xm}</div>;
				})}
			</Descriptions.Item>
		</Descriptions>
	);
};

export default CrpInfo;
