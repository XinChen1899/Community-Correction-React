import { Card, Col, List, Row, Timeline } from "antd";
import "react";
import { SmileOutlined } from "@ant-design/icons";

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
			<h2>首页</h2>
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
				<Card title="代办列表">
					<Timeline
						items={[
							{
								color: "green",
								children: "导航栏、路由跳转完成",
							},
							{
								color: "gray",
								children: (
									<>
										<p>调查评估</p>
									</>
								),
							},
						]}
					/>
				</Card>
			</div>
		</div>
	);
};
