import { useMessage } from "@/utils/msg/GMsg";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { DownOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import InfoModal from "./Modal/InfoModal";
import ModifyModal from "./Modal/ModifyModal";
import { getAllCate } from "@/api/cate";
import { map2Value, nsyjzlbMap } from "@/utils";

export interface DataType {
	id: number;
	dxbh: string; // 矫正对象编号
	xm: string; // 矫正对象姓名
	gllb: string; // 管理类别
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
		title: "管理类别",
		dataIndex: "gllb",
		align: "center",
		render: (_, record) => (
			<Tag>{map2Value(nsyjzlbMap, record.gllb)}</Tag>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{ id: 1, dxbh: "00000001", xm: "xxx", gllb: "yyy" },
];

export default function CategoryManagement() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [infoModal, setInfoModal] = useState(false);
	const [modifyModal, setModifyModal] = useState(false);
	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setModifyModal(true)}>
					修改矫正类别
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
							onClick={() => setInfoModal(true)}>
							查看信息
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
		getAllCate(
			(infoList: any) => {
				setTableData(infoList);
			},
			(msg: string) =>
				gMsg.onError("请求不到调查评估的所有信息！" + msg)
		);
	}, [tableUpdate]);

	return (
		<>
			<InfoModal
				open={infoModal}
				setOpen={setInfoModal}
				info={record}
				gMsg={gMsg}
			/>
			<ModifyModal
				open={modifyModal}
				setOpen={setModifyModal}
				info={record}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={undefined}
				cardTitle={"分类管理"}
				statisticList={[
					{ title: "基础级人员总数", value: 999 },
					{ title: "宽松级人员总数", value: 999 },
					{ title: "普通级人员总数", value: 999 },
					{ title: "严格级人员总数", value: 999 },
				]}
				tableOnRow={(record: DataType) => setRecord(record)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</>
	);
}
