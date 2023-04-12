import { Button, Dropdown, MenuProps, Popconfirm, Space } from "antd";
import {
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import AddTeamModal from "./Modal/AddTeamModal";
import TemplateHome from "@/template/OperatorAndTable";
import TeamInfoModal from "./Modal/TeamInfoModal";
import TeamModifyModal from "./Modal/TeamModifyModal";
import { useMessage } from "@/utils/msg/GMsg";
import { getAllWorkers } from "@/api/ic";
import { Worker } from "@/entity/IC/Worker";
import { CrTeam } from "@/entity/IC/CrTeam";
import { getAllCrt } from "@/api/ic/crteam";

export type DataType = CrTeam;

const defaultDataType: DataType = {
	id: "",
	teamName: "",
	monitor: "",
	teamNumber: 0,
	workers: [],
};

const columns: ColumnsType<DataType> = [
	{
		title: "小组编号",
		dataIndex: "id",
		key: "id",
		width: 150,
	},
	{
		title: "小组名",
		dataIndex: "teamName",
		key: "teamName",
	},
	{
		title: "组长姓名",
		dataIndex: "monitor",
		key: "monitor",
	},
	{
		title: "小组人数",
		dataIndex: "teamNumber",
		key: "teamNumber",
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function CorrectionTeam() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [openAdd, setOpenAdd] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>();

	const [worker, setWorker] = useState<Worker[]>();


	const [selectRecord, setSelectRecord] =
		useState<DataType>(defaultDataType);

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setOpenModify(true)}>
					修改小组信息
				</Button>
			),
			key: "0",
		},
		{ type: "divider" },
		{
			label: (
				<Popconfirm
					title="是否删除"
					description="是否删除该调查评估信息！"
					onOpenChange={() => console.log("open change")}>
					<Button
						type={"primary"}
						danger
						block
						icon={<DeleteOutlined />}>
						删除!
					</Button>
				</Popconfirm>
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

	useEffect(() => {
		getAllWorkers(
			(data: any) => {
				setWorker(data);
			},
			() => {}
		);
	}, [tableUpdate]);

	useEffect(() => {
		getAllCrt(
			(data: any) => {
				setTableData(data);
			},
			(msg: string) => {
				gMsg.onError("获取矫正小组失败！" + msg);
			}
		);
	}, [tableUpdate]);

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
					<>
						<Space direction={"horizontal"}>
							<Button
								onClick={() => {
									setOpenAdd(true);
								}}
								type={"primary"}
								icon={<PlusOutlined />}>
								新增矫正小组
							</Button>
						</Space>
					</>
				}
				cardTitle={"矫正小组统计"}
				statisticList={[
					{ title: "矫正小组总数", value: 999 },
				]}
				tableData={tableData}
				tableOnRow={(record: any) => setSelectRecord(record)}
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</>
	);
}
