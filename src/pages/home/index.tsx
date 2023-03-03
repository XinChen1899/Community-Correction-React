import { Avatar, Card, Col, List, Row } from "antd";
import "react";
const data = [
	{
		title: "Ant Design Title 1",
	},
	{
		title: "Ant Design Title 2",
	},
	{
		title: "Ant Design Title 3",
	},
	{
		title: "Ant Design Title 4",
	},
];

const techs = [
	{
		id: 1,
		title: "前端",
		skills: ["React", "Ant Design", "react-router-dom", "vite"],
	},
	{
		id: 2,
		title: "后端",
		skills: ["SprintBoot", "SpringCloud", "MyBatis"],
	},
	{
		id: 3,
		title: "数据库",
		skills: ["MySQL"],
	},
];

export default () => {
	return (
		<div>
			<h2 style={{ color: "black" }}>首页</h2>
			<div>
				<Row gutter={16}>
					{techs.map((tech) => {
						return (
							<Col span={8} key={tech.id}>
								<Card title={tech.title} bordered={false}>
									<List
										itemLayout="horizontal"
										dataSource={tech.skills}
										renderItem={(item) => (
											<List.Item>
												<List.Item.Meta
													title={
														<a href="##">
															{item}
														</a>
													}
												/>
											</List.Item>
										)}
									/>
								</Card>
							</Col>
						);
					})}
				</Row>
			</div>
		</div>
	);
};
