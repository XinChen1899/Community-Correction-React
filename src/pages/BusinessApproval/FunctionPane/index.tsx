import { Card, Space, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

export default function FunctionPane() {
	const navigate = useNavigate();
	return (
		<Card title="业务审批">
			<Space direction="vertical" style={{ display: "flex" }}>
				<Row gutter={16}>
					<Col span={8}>
						<Card
							title="禁止令（进入特定场所审批）"
							bordered={false}
							hoverable
							onClick={() => {
								navigate("/business/ban");
							}}>
							1. 查询适用禁止令的人员，手动/根据档
							案信息自动新增适用禁止令人员。
							2.生成禁止令协助执行函。
							3.进入特定场所申请，上传资料；进入
							特定场所审批，生成《社区矫正事项
							审批告知书》，审批结果抄送决定机关
							和检察院。
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
