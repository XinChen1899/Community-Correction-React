import {
	Card,
	Col,
	Descriptions,
	Input,
	Row,
	Space,
	Statistic,
} from "antd";

import Table from "antd/es/table";
const { Search } = Input;

export default function TemplateOperatorAndTable(props: {
	columns: any;
	cardExtra?: any;
	cardTitle: string;
	statisticList?: any;
	searchList?: any;
	tableOnRow: any;
	tableData: any;
	tableRowKey: any;
}) {
	const {
		columns,
		cardExtra,
		cardTitle,
		statisticList,
		tableOnRow,
		tableData,
		tableRowKey,
		searchList,
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
											span={8}
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
					<Row gutter={16}>
						{searchList &&
							searchList.map((s: any, idx: number) => {
								return (
									<Col span={8} key={`${idx}`}>
										<Search
											placeholder={
												s.placeholder
											}
											allowClear
											enterButton
											onSearch={s.onSearch}
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
					rowKey={tableRowKey}
					onRow={(record) => {
						return {
							onClick: () => {
								if (tableOnRow) tableOnRow(record);
							},
						};
					}}
				/>
			</Space>
		</div>
	);
}
