import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import HandleInfoModal from "../Modal/HandleInfo";

// 解除矫正办理信息
export interface UnCorrectedHandleInfo {
	dxbh: string;
	xm: string;
	jdb: string; // 鉴定表
	zms: string; // 证明书
	step: number; // 审批步骤
}
export type DataType = UnCorrectedHandleInfo;

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
		align: "center",
		width: 150,
	},
	{
		title: "矫正对象姓名",
		dataIndex: "xm",
		align: "center",
		key: "xm",
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{ dxbh: "00000001", xm: "xxx", jdb: "xxx", zms: "xxx", step: 0 },
	{ dxbh: "00000002", xm: "xx", jdb: "xxx", zms: "xxx", step: 0 },
	{ dxbh: "00000003", xm: "yx", jdb: "xxx", zms: "xxx", step: 0 },
	{ dxbh: "00000004", xm: "yyx", jdb: "xxx", zms: "xxx", step: 0 },
	{ dxbh: "00000005", xm: "z", jdb: "xxx", zms: "xxx", step: 0 },
];

export default function UncorrectedHandle() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [history, setHistory] = useState<DataType[]>([]);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [openInfo, setOpenInfo] = useState(false);

	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button block type="text" onClick={() => {}}>
					占位
				</Button>
			),
			key: "0",
		},
	];
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => setOpenInfo(true)}>
							查看/修改《解除矫正证明书》
						</Button>

						<Dropdown
							menu={{ items }}
							trigger={["click"]}>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
									操作
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
					</Space>
				);
			};
		}
	});
	return (
		<>
			<HandleInfoModal
				open={openInfo}
				setOpen={setOpenInfo}
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
							onClick={() => setOpenInfo(true)}>
							新增解除矫正
						</Button>
					</>
				}
				cardTitle={"解矫办理"}
				searchList={[
					{
						placeholder: "请输入对象编号",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.dxbh.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
					{
						placeholder: "请输入对象姓名",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.xm.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
				]}
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
