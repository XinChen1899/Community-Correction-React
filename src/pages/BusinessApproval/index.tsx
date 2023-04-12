import { Card, Space, Row, Col } from "antd";

export default function BusinessApproval() {
	return (
		<Card title="业务审批">
			<Space direction="vertical" style={{ display: "flex" }}>
				<Row gutter={16}>
					<Col span={8}>
						<Card
							title="禁止令（进入特定场所审批）"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card title="会客" bordered={false} hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card title="外出" bordered={false} hoverable>
							Card content
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Card
							title="经常性跨市县活动"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="迁居/执行地变更"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="病情复查延期/暂予监外执行"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Card
							title="减免考核"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
				</Row>
			</Space>
		</Card>
	);
}
