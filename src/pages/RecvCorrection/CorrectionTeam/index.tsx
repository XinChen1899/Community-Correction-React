import { getAllWorkers } from "@/api/ic";
import { getAllCrt } from "@/api/ic/crteam";
import { CrTeam } from "@/entity/IC/CrTeam";
import { Worker } from "@/entity/IC/Worker";
import TemplateHome from "@/template/OperatorAndTable";
import { getColumn } from "@/template/Table";
import { useMessage } from "@/utils/msg/GMsg";
import {
	DownOutlined,
	EditTwoTone,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import AddTeamModal from "./Modal/AddTeamModal";
import TeamInfoModal from "./Modal/TeamInfoModal";
import TeamModifyModal from "./Modal/TeamModifyModal";

export type DataType = CrTeam;

const columns: ColumnsType<DataType> = [
	getColumn("小组编号", "id"),
	getColumn("小组名", "teamName"),
	getColumn("组长姓名", "monitor"),
	getColumn("小组人数", "teamNumber"),
	getColumn("操作", "action"),
];

//! 矫正小组
export default function CorrectionTeam() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [openAdd, setOpenAdd] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [worker, setWorker] = useState<Worker[]>();

	const [selectRecord, setSelectRecord] = useState<DataType>(
		{} as DataType
	);

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="link"
					icon={<EditTwoTone />}
					onClick={() => setOpenModify(true)}>
					修改小组信息
				</Button>
			),
			key: "0",
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
							小组信息
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
		} else if (column.key == "monitor") {
			column.render = (_, rec) => {
				return <a>{workerMap[rec.monitor]}</a>;
			};
		}
	});

	useRequest(getAllWorkers, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setWorker(data.data);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	useRequest(getAllCrt, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setTableData(data.data);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	const workerMap = useMemo(() => {
		const temp: any = {};
		worker?.forEach((element: Worker) => {
			temp[element.rybm] = element.xm;
		});
		return temp;
	}, [worker]);

	return (
		<>
			<AddTeamModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				worker={worker}
			/>
			<TeamInfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				selectRecord={selectRecord}
				workerMap={workerMap}
			/>
			<TeamModifyModal
				open={openModify}
				setOpen={setOpenModify}
				info={selectRecord}
				worker={worker ? worker : []}
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
						新增矫正小组
					</Button>
				}
				cardTitle={"矫正小组统计"}
				statisticList={[
					{ title: "矫正小组总数", value: 999 },
				]}
				searchList={[
					{
						placeholder: "请输入小组编号",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.id.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
					{
						placeholder: "请输入小组名",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) =>
									item.teamName.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
				]}
				tableData={tableData}
				tableOnRow={(record: DataType) =>
					setSelectRecord(record)
				}
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</>
	);
}
