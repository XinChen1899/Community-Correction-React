import { getAllExitInfos } from "@/api/noexit";
import { Exit } from "@/entity/NoExit/Exit";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { getColumn } from "@/template/Table";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { map2Value, zjMap } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import {
	AppstoreAddOutlined,
	DownOutlined,
	EditTwoTone,
	InfoCircleFilled,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import BBModal from "./Modal/BBModal";
import InfoModal from "./Modal/InfoModal";
import ZJModal from "./Modal/ZJModal";

export type DataType = Exit;

const columns: ColumnsType<DataType> = [
	getColumn("对象编号", "dxbh"),
	getColumn("姓名", "xm"),
	getColumn("报备", "bb", (_, record) => (
		<TemplateTag
			value={record.bb != "0" ? "已备案" : "待备案"}
			type={
				record.bb != "0" ? MyTagType.Info : MyTagType.Warning
			}
		/>
	)),
	getColumn("证件", "zj", (_, record) => (
		<TemplateTag
			value={map2Value(zjMap, record.zj)}
			type={
				record.zj == "06" ? MyTagType.Warning : MyTagType.Info
			}
		/>
	)),
	getColumn("边控", "bk", (_, record) => (
		<TemplateTag
			value={record.bk != "0" ? "已边控" : "未边控"}
			type={
				record.bk != "0" ? MyTagType.Info : MyTagType.Warning
			}
		/>
	)),
	getColumn("操作", "action"),
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

	const [openInfo, setOpenInfo] = useState(false);
	const [openBB, setOpenBB] = useState(false);
	const [openZJ, setOpenZJ] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditTwoTone />}
					onClick={() => {
						setOpenBB(true);
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
					onClick={() => setOpenZJ(true)}>
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
			column.render = () => {
				return (
					<Space size="middle">
						<Button
							type="link"
							onClick={() => setOpenInfo(true)}>
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
			if (data.status == "200") {
				setTableData(data.data);
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	return (
		<>
			<ZJModal
				open={openZJ}
				setOpen={setOpenZJ}
				dxbh={record.dxbh}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<BBModal
				open={openBB}
				setOpen={setOpenBB}
				dxbh={record.dxbh}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={record}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
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
