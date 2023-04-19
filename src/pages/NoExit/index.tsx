import { getAllExitInfos } from "@/api/noexit";
import { Exit } from "@/entity/NoExit/Exit";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { TagType } from "@/template/Tag";
import { useMessage } from "@/utils/msg/GMsg";
import {
	AppstoreAddOutlined,
	DownOutlined,
	EditOutlined,
	InfoCircleFilled,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import BBModal from "./Modal/BBModal";
import InfoModal from "./Modal/InfoModal";

export type DataType = Exit;

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
		align: "center",
		width: 150,
	},
	{
		title: "姓名",
		dataIndex: "xm",
		key: "xm",
		align: "center",
	},
	{
		title: "报备",
		dataIndex: "bb",
		key: "bb",
		align: "center",
		render: (_, record) => (
			<TemplateTag
				value={record.bb != "0" ? "已备案" : "待备案"}
				type={
					record.bb != "0" ? TagType.Info : TagType.Warning
				}
			/>
		),
		width: 120,
	},
	{
		title: "证件",
		dataIndex: "zj",
		key: "zj",
		align: "center",
		render: (_, record) => <Tag>{record.zj}</Tag>,
		width: 120,
	},
	{
		title: "边控",
		dataIndex: "bk",
		key: "bk",
		align: "center",
		render: (_, record) => (
			<TemplateTag
				value={record.bk != "0" ? "已边控" : "未边控"}
				type={
					record.bk != "0" ? TagType.Info : TagType.Warning
				}
			/>
		),
		width: 120,
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{
		dxbh: "00000001",
		xm: "xxx",
		bb: "0",
		zj: "代管",
		bk: "1",
	},
	{
		dxbh: "00000002",
		xm: "yyy",
		bb: "0",
		zj: "归还",
		bk: "0",
	},
];

/**
 * 不准出境
 * todoList
 * 1. 调查评估接收后，不准出境列表自动更新
 * 2. 可以报备、证照代管、边控
 * 3. 查看出入境情况
 */

export default function NoExit() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [infoModal, setInfoModal] = useState(false);
	const [bbModal, setBBModal] = useState(false);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
	const [history, setHistory] = useState<DataType[]>([]);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => {
						setBBModal(true);
					}}>
					报备审批
				</Button>
			),
			key: "0",
		},
		{
			label: (
				<Button
					block
					type="text"
					icon={<AppstoreAddOutlined />}
					onClick={() => {
						gMsg.onSuccess("证照代管");
					}}>
					证照代管审批
				</Button>
			),
			key: "1",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Button
					block
					type={"text"}
					onClick={() => {
						gMsg.onSuccess("边控");
					}}
					icon={<InfoCircleFilled />}>
					边控审批
				</Button>
			),
			key: "2",
		},
	];
	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => {
								setInfoModal(true);
							}}>
							出入境情况
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

	useRequest(getAllExitInfos, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setTableData(data.data);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	return (
		<>
			<BBModal
				open={bbModal}
				setOpen={setBBModal}
				dxbh={record.dxbh}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<InfoModal
				open={infoModal}
				setOpen={setInfoModal}
				info={record}
				gMsg={gMsg}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={undefined}
				cardTitle={"出入境管理"}
				statisticList={[
					{ title: "矫正人员总数", value: 999 },
					{ title: "今日新增待备案人数", value: 999 },
				]}
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
