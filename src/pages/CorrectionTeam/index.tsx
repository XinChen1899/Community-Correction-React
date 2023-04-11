import {
	Button,
	Dropdown,
	MenuProps,
	message,
	Popconfirm,
	Space,
} from "antd";
import {
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import AddTeamModal from "./Modal/AddTeamModal";
import TemplateHome from "@/template/OperatorAndTable";
import TeamInfoModal from "./Modal/TeamInfoModal";
import TeamModifyModal from "./Modal/TeamModifyModal";
import { GMessage } from "@/utils/msg/GMsg";
import { getAllCrt, getAllWorkers } from "@/api/ic";
import { Worker } from "@/entity/IC/Worker";
import { Cteam } from "@/entity/IC/Cteam";

export interface DataType {
	id: string; // 小组编号
	teamName: string; // 小组名
	monitor: string; // 组长姓名
	teamNumber: number; // 小组人数
	workers?: string[];
}

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
	const [messageApi, contextHolder] = message.useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [addModalOpen, setAddModalOpen] = useState(false);
	const [teamInfoModalOpen, setTeamInfoModalOpen] = useState(false);
	const [teamModifyModalOpen, setTeamModifyModalOpen] =
		useState(false);

	const [tableData, setTableData] = useState<DataType[]>();
	const [worker, setWorker] = useState<Worker[]>();
	const [workerMap, setWorkerMap] = useState<any>();

	const [selectRecord, setSelectRecord] =
		useState<DataType>(defaultDataType);

	const successMsg = (msg: string) => {
		messageApi.open({
			type: "success",
			content: msg,
		});
	};

	const errorMsg = (msg: string) => {
		messageApi.open({
			type: "error",
			content: msg,
		});
	};
	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setTeamModifyModalOpen(true)}>
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
			key: "0",
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
							onClick={() =>
								setTeamInfoModalOpen(true)
							}>
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
		}
	});

	const gMsg: GMessage = {
		onSuccess: successMsg,
		onError: errorMsg,
	};

	useEffect(() => {
		getAllWorkers(
			(data: any) => {
				setWorker(data);
				const temp: any = {};
				data.forEach((element: Worker) => {
					temp[element.rybm] = element.xm;
				});
				setWorkerMap(temp);
			},
			() => {}
		);
	}, []);

	useEffect(() => {
		getAllCrt(
			(data: any) => {
				setTableData(data);
			},
			() => {}
		);
	}, [tableUpdate]);

	return (
		<>
			<AddTeamModal
				open={addModalOpen}
				setOpen={setAddModalOpen}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				worker={worker}
			/>
			<TeamInfoModal
				open={teamInfoModalOpen}
				setOpen={setTeamInfoModalOpen}
				selectRecord={selectRecord}
				workerMap={workerMap}
			/>
			<TeamModifyModal
				open={teamModifyModalOpen}
				setOpen={setTeamModifyModalOpen}
				selectRecord={selectRecord}
				gMsg={gMsg}
			/>
			{contextHolder}
			<TemplateHome
				columns={columns}
				cardExtra={
					<>
						<Space direction={"horizontal"}>
							<Button
								onClick={() => {
									setAddModalOpen(true);
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
			/>
		</>
	);
}
