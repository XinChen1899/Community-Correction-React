import { getAllPlan } from "@/api/ic/crplan";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import TemplateHome from "@/template/OperatorAndTable";
import { getColumn } from "@/template/Table";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { jzlbMap, map2Value } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import {
	DownOutlined,
	EditTwoTone,
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
	getColumn("方案编号", "id"),
	getColumn("方案名称", "famc"),
	getColumn("对象编号", "dxbh"),
	getColumn("矫正对象姓名", "xm"),
	getColumn("矫正类别", "jzlb", (_, record) => (
		<TemplateTag
			value={map2Value(jzlbMap, record.jzlb)}
			type={MyTagType.Info}
		/>
	)),
	getColumn("操作", "action"),
];

export default function CorrectionPlan() {
	const [gMsg, contextHolder] = useMessage();

	const [openAdd, setOpenAdd] = useState(false);
	const [openModify, setOpenModify] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);

	const [tableUpdate, setTableUpdate] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [selectRecord, setSelectRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditTwoTone />}
					onClick={() => setOpenModify(true)}>
					修改矫正方案
				</Button>
			),
			key: "0",
		},
		{ type: "divider" },
	];

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = () => {
				return (
					<Space size="middle">
						<Button
							type="link"
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
			if (data.status == "200") {
				setTableData(data.data);
			} else {
				gMsg.onError(data.message);
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
					<Button
						onClick={() => setOpenAdd(true)}
						type={"primary"}
						icon={<PlusOutlined />}>
						新增矫正方案
					</Button>
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
				tableData={tableData}
				tableOnRow={(rec: DataType) => setSelectRecord(rec)}
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</div>
	);
}
