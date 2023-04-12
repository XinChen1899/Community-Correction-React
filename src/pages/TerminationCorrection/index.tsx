import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import RecvModal from "./Modal/RecvModal";

export interface DataType {
	id: number;
	dxbh: string; // 矫正对象编号
	xm: string; // 矫正对象姓名
	cf: string; // 处罚类型
}

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
		title: "处罚",
		dataIndex: "cf",
		align: "center",
		render: (_, record) => <Tag>{record.cf}</Tag>,
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{ id: 1, dxbh: "00000001", xm: "xxx", cf: "yyy" },
];

export default function TerminationCorrection() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [openInfo, setInfoModal] = useState(false);
	const [openModify, setModifyModal] = useState(false);

	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					onClick={() => setModifyModal(true)}>
					立功审核
				</Button>
			),
			key: "0",
		},
		{
			label: (
				<Button
					block
					type="text"
					onClick={() => setModifyModal(true)}>
					减刑审核
				</Button>
			),
			key: "1",
		},
	];
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => setInfoModal(true)}>
							查看处罚信息
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
			<RecvModal
				open={openModify}
				setOpen={setModifyModal}
				dxbh={""}
				gMsg={gMsg}
				infoUpdate={false}
				setInfoUpdate={undefined}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={
					<>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => setModifyModal(true)}>
							发起终止矫正
						</Button>
					</>
				}
				cardTitle={"终止矫正"}
				statisticList={undefined}
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={staticTableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
