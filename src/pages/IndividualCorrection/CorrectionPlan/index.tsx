import { getAllPlan } from "@/api/ic/crplan";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import TemplateHome from "@/template/OperatorAndTable";
import TemplateTag, { TagType } from "@/template/Tag";
import { jzlbMap, map2Value } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import {
	CheckCircleFilled,
	DownOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddModal from "./Modal/AddModal/AddTeam";
import InfoModal from "./Modal/InfoModal";
import ModifyModal from "./Modal/ModifyModal";

export type DataType = CrpPlan;

const columns: ColumnsType<DataType> = [
	{
		title: "方案编号",
		dataIndex: "id",
		key: "id",
		align: "center",
	},
	{
		title: "方案名称",
		dataIndex: "famc",
		align: "center",
		key: "famc",
	},
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
		title: "矫正类别",
		dataIndex: "jzlb",
		align: "center",
		key: "jzlb",
		render: (_, record) => (
			<TemplateTag
				value={map2Value(jzlbMap, record.jzlb)}
				type={TagType.Info}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function CorrectionPlan() {
	const [gMsg, contextHolder] = useMessage();

	const [openAdd, setOpenAdd] = useState(false);
	const [openModify, setOpenModify] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);

	const [tableUpdate, setTableUpdate] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

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
					onClick={() => setOpenModify(true)}>
					修改矫正方案
				</Button>
			),
			key: "0",
		},
		{ type: "divider" },
		{
			label: (
				<Button
					block
					type="text"
					icon={<CheckCircleFilled />}
					onClick={() => setOpenModify(true)}>
					方案评估
				</Button>
			),
			key: "1",
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
							onClick={() => setOpenInfo(true)}>
							查看矫正方案
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

	useRequest(getAllPlan, {
		onSuccess({ data }) {
			if (data.status == 200) {
				setTableData(data.data);
			}
		},
		onError(e) {
			gMsg.onError("获取全部方案失败!" + e.message);
		},
		refreshDeps: [tableUpdate],
	});

	return (
		<div>
			<ModifyModal
				open={openModify}
				setOpen={setOpenModify}
				info={selectRecord}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
			/>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
			/>
			<AddModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			{contextHolder}
			<TemplateHome
				columns={columns}
				cardExtra={
					<>
						<Button
							onClick={() => setOpenAdd(true)}
							type={"primary"}
							icon={<PlusOutlined />}>
							新增矫正方案
						</Button>
					</>
				}
				cardTitle={"矫正方案统计"}
				statisticList={[
					{ title: "矫正方案总数", value: 999 },
				]}
				searchList={[
					{
						placeholder: "请输入方案名称",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.famc.includes(value)
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
				]}
				tableData={tableData.length ? tableData : []}
				tableOnRow={(rec: DataType) => setSelectRecord(rec)}
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</div>
	);
}