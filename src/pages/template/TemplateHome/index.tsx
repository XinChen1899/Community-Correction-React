import { Card, Col, Descriptions, Row, Space, Statistic } from "antd";

import Table from "antd/es/table";

export default function OperatorAndTable(props: {
	columns: any;
	cardExtra: any;
	cardTitle: string;
	statisticList: any;
	tableData: any;
	tableOnRow: any;
}) {
	const {
		columns,
		cardExtra,
		cardTitle,
		statisticList,
		tableData,
		tableOnRow,
	} = props;

	return (
		<div>
			<Space direction={"vertical"}>
				<Card title={cardTitle} extra={cardExtra}>
					<Row gutter={16}>
						{statisticList.map((s: any, idx: number) => {
							return (
								<Col span={12} key={idx}>
									<Statistic
										title={s.title}
										value={s.value}
									/>
								</Col>
							);
						})}
					</Row>
					<Descriptions></Descriptions>
				</Card>

				<Table
					columns={columns}
					dataSource={tableData}
					rowKey={(record) => record.id}
					onRow={(record) => {
						return {
							onClick: () => {
								tableOnRow(record);
							}, // 点击行
						};
					}}
				/>
			</Space>
		</div>
	);
}
