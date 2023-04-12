import { GMessage, useMessage } from "@/utils/msg/GMsg";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import {
	EditOutlined,
	DownOutlined,
	AppstoreAddOutlined,
	InfoCircleFilled,
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
import BBModal from "./Modal/BBModal";
import { getAllInfos } from "@/api/NoExit";
import { Exit } from "@/entity/NoExit/Exit";

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
			<Tag>{record.bb ? "已备案" : "待备案"}</Tag>
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
			<Tag>{record.bk ? "已边控" : "未边控"}</Tag>
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
		bb: false,
		zj: "代管",
		bk: true,
	},
	{
		dxbh: "00000002",
		xm: "yyy",
		bb: true,
		zj: "归还",
		bk: false,
	},
];

/**
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
	const [infoUpdate, setInfoUpdate] = useState(false);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
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
					报备
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
					证照代管
				</Button>
			),
			key: "01",
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
					边控
				</Button>
			),
			key: "23",
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

	useEffect(() => {
		getAllInfos(
			(infoList: Exit[]) => {
				setTableData(infoList);
			},
			(msg: string) =>
				gMsg.onError("请求不到出入境的所有信息！" + msg)
		);
	}, [tableUpdate]);

	return (
		<>
			<BBModal
				open={bbModal}
				setOpen={setBBModal}
				dxbh={record.dxbh}
				gMsg={gMsg}
				infoUpdate={infoUpdate}
				setInfoUpdate={setInfoUpdate}
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
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
