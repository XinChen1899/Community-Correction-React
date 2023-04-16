import { Card, Space, Row, Col, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
function FunctionPane() {
	const navigate = useNavigate();

	return (
		<Card title="日常管理功能">
			<Space direction="vertical" style={{ display: "flex" }}>
				<Row gutter={16}>
					<Col span={8}>
						<Card
							title="定期报到"
							bordered={true}
							hoverable
							onClick={() => {
								navigate("/daily/check");
							}}>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="日常报告"
							bordered={false}
							onClick={() => {
								navigate("/daily/report");
							}}
							hoverable>
							书面报告次数由管理等级关联生成，可提交
							纸质格式表格扫描上传或由矫正对象在矫通
							扫描上传（纸质版同时提交）。报告完成情
							况关联计分考核、矫正方案落实记录。
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="实地查访"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Card
							title="通信联络"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="信息化核查"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="公安情报核查"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Card
							title="病情复查诊断"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="脱管处置"
							bordered={false}
							hoverable>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card
							title="被羁押处置"
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

export default FunctionPane;
