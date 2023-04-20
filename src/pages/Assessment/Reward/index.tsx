import { RewardInfo } from "@/entity/Assessment/Reward/RewardInfo";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { TagType } from "@/template/Tag";
import { jllbMap, map2Value } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddModal from "./Modal/AddModal";
import InfoModal from "./Modal/InfoModal";
import ProcessPraiseModal from "./Modal/ProcessPraiseModal";

export type DataType = RewardInfo;

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
		title: "奖励",
		dataIndex: "jllb",
		align: "center",
		key: "jllb",
		render: (_, record) => (
			<TemplateTag
				value={map2Value(jllbMap, record.jllb)}
				type={TagType.Info}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{
		id: 1,
		dxbh: "00000001",
		xm: "xxx",
		jllb: "01",
		step: 0,
		date: "xxx",
		jlr: "Xxx",
		jlyy: "yyy",
	},
];

export default function Reward() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [openInfo, setOpenInfo] = useState(false);
	const [openPraise, setOpenPraise] = useState(false);
	const [openAdd, setOpenAdd] = useState(false);
	const [openRecv, setOpenRecv] = useState(false);

	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					onClick={() => setOpenAdd(true)}>
					立功审核占位
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
							查看奖励信息
						</Button>
						<Button
							type={"primary"}
							onClick={() => setOpenPraise(true)}>
							审批
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
			<ProcessPraiseModal
				open={openPraise}
				setOpen={setOpenPraise}
				info={record}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
			/>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={record}
			/>
			<AddModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
				info={record}
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
							onClick={() => {
								setOpenAdd(true);
							}}>
							新增奖励
						</Button>
					</>
				}
				cardTitle={"奖励查询"}
				statisticList={undefined}
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={staticTableData}
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</>
	);
}
