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
import AddModal from "./Modal/AddModal/AddTeam";
import TemplateHome from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import { getAllPlan } from "@/api/ic/crplan";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import InfoModal from "./Modal/InfoModal";
import ModifyModal from "./Modal/ModifyModal";

export type DataType = CrpPlan;

const columns: ColumnsType<DataType> = [
	{
		title: "方案编号",
		dataIndex: "id",
		key: "id",
		align: "center",
		width: 150,
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

	useEffect(() => {
		getAllPlan(
			(data: DataType[]) => {
				setTableData(data);
			},
			(msg: string) => {
				gMsg.onError("获取全部方案失败!" + msg);
			}
		);
	}, [tableUpdate]);

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
				tableData={tableData.length ? tableData : []}
				tableOnRow={(rec: DataType) => setSelectRecord(rec)}
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</div>
	);
}
