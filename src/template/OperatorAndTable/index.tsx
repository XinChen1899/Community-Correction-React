import { Card, Col, Descriptions, Row, Space, Statistic } from "antd";

import Table from "antd/es/table";

export default function TemplateOperatorAndTable(props: {
	columns: any;
	cardExtra?: any;
	cardTitle: string;
	statisticList?: any;
	tableOnRow: any;
	tableData: any;
}) {
	const {
		columns,
		cardExtra,
		cardTitle,
		statisticList,
		tableOnRow,
		tableData,
	} = props;

	return (
		<div>
			<Space direction={"vertical"}>
				<Card title={cardTitle} extra={cardExtra}>
					<Row gutter={16}>
						{statisticList &&
							statisticList.map(
								(s: any, idx: number) => {
									return (
										<Col
											span={12}
											key={`${s.title}${idx}`}>
											<Statistic
												title={s.title}
												value={s.value}
											/>
										</Col>
									);
								}
							)}
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
								if (tableOnRow) tableOnRow(record);
							}, // 点击行
						};
					}}
				/>
			</Space>
		</div>
	);
}
