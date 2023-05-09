import { CrTeam } from "@/entity/IC/CrTeam";
import TemplateDescriptions from "@/template/Descriptions";
import { Card, List } from "antd";

const CrpInfo = (props: { info: CrTeam; workerMap: any }) => {
	const { info, workerMap } = props;
	return (
		<TemplateDescriptions
			title={"矫正小组信息"}
			info={[
				{ label: "矫正小组编号", value: info.id },
				{
					label: "小组名",
					value: info.name,
				},
				{ label: "组长姓名", value: workerMap[info.monitor] },
				{
					label: "小组成员",
					value: (
						<List
							grid={{ gutter: 16, column: 3 }}
							dataSource={info.workers}
							renderItem={(item) => (
								<List.Item>
									<Card
										title={`编号${item}`}
										hoverable>
										{workerMap[item]}
									</Card>
								</List.Item>
							)}
						/>
					),
					span: 3,
				},
			]}
		/>
	);
};

export default CrpInfo;
