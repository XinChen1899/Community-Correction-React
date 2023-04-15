import { Score } from "@/entity/Assessment/Score";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { GMessage, useMessage } from "@/utils/msg/GMsg";
import {
	DownOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import {
	Button,
	Dropdown,
	MenuProps,
	Space,
	Tag,
	message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import InfoModal from "./Modal/InfoModal";
import ModifyModal from "./Modal/Modify";
import { getAllScores } from "@/api/assessment/score";

export type DataType = Score;

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
		title: "累计分",
		dataIndex: "score",
		key: "score",
		align: "center",
		render: (_, record) => <Tag>{record.score}</Tag>,
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{ dxbh: "00000001", xm: "xxx", score: 100 },
];

export default function AssessmentScore() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					onClick={() => setOpenModify(true)}>
					加/扣分
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
							查看计分列表
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
		getAllScores(
			(scores: DataType[]) => {
				setTableData(scores);
			},
			(msg: string) => {
				gMsg.onError("获取分数失败！" + msg);
			}
		);
	}, [tableUpdate]);

	return (
		<>
			<ModifyModal
				open={openModify}
				setOpen={setOpenModify}
				gMsg={gMsg}
				info={record}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={record}
				gMsg={gMsg}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={<></>}
				cardTitle={"计分考核"}
				statisticList={undefined}
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
