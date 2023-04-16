import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import {
	EditOutlined,
	DownOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { map2Value, nsyjzlbMap } from "@/utils";
import { ReportInfo } from "@/entity/Daily/report/ReportInfo";
import AddModal from "./Modal/AddModal";
import InfoModal from "./Modal/InfoModal";
import { getAllReports } from "@/api/daily/report";

export type DataType = ReportInfo;

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
	},
	{
		title: "对象姓名",
		dataIndex: "xm",
		key: "xm",
	},
	{
		title: "管理类别",
		dataIndex: "gllb",
		key: "gllb",
		render: (_, rec) => (
			<Tag>{map2Value(nsyjzlbMap, rec.gllb)}</Tag>
		),
	},
	{
		title: "需提交报告数",
		dataIndex: "report_count",
		key: "report_count",
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function DailyReport() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);
	const [tableData, setTableData] = useState<DataType[]>();
	const [selectRecord, setSelectRecord] = useState<DataType>(
		{} as DataType
	);

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setOpenInfo(true)}>
					查看报告记录
				</Button>
			),
			key: "0",
		},
	];
	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Dropdown menu={{ items }} trigger={["click"]}>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								操作
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				);
			};
		}
	});

	const [openAdd, setOpenAdd] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);

	useEffect(() => {
		getAllReports(
			(list: ReportInfo[]) => {
				setTableData(list);
			},
			(msg: string) => {
				gMsg.onError("请求不到报告的所有信息！" + msg);
			}
		);
	}, [tableUpdate]);

	return (
		<>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
				gMsg={gMsg}
			/>
			<AddModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={
					<>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => setOpenAdd(true)}>
							添加报告
						</Button>
					</>
				}
				cardTitle={"日常报告"}
				statisticList={[
					{ title: "今日提交报告数", value: 999 },
				]}
				tableOnRow={(rec: DataType) => setSelectRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
