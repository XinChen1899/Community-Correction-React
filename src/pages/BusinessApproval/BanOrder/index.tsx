import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import {
	EditOutlined,
	DownOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import AddModal from "./Modal/AddModal";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import ProcessModal from "./Modal/ProcessModal";
import { getAllBans } from "@/api/business/ban";

export type DataType = BanInfo;

const columns: ColumnsType<DataType> = [
	{
		title: "申请对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
	},
	{
		title: "申请对象姓名",
		dataIndex: "xm",
		key: "xm",
	},
	{
		title: "申请进入的场所",
		dataIndex: "sqjrcs",
		key: "sqjrcs",
		render: (_, rec) => <Tag>{rec.sqjrcs}</Tag>,
	},
	{
		title: "审批结果",
		dataIndex: "xjsqjzjgsjg",
		key: "xjsqjzjgsjg",
		render: (_, rec) => <Tag>{rec.xjsqjzjgsjg}</Tag>,
	},
	{
		title: "操作",
		key: "action",
	},
];
const defultDataType: DataType = {
	dxbh: "111",
	xm: "111",
	sqjrcs: "222",
	sqrq: "",
	sqjrsj: "",
	sqjssj: "",
	sqly: "",
	sfsshr: "",
	sfsshsj: "",
	sfsshyj: "",
	xjsqjzjgspr: "",
	xjsqjzjgspsj: "",
	xjsqjzjgspyj: "",
	xjsqjzjgsjg: "",
	step: 1,
};
const staticTableData: DataType[] = [defultDataType];

export default function BanOrder() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);
	const [tableData, setTableData] = useState<DataType[]>();
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
					onClick={() => {}}>
					占位
				</Button>
			),
			key: "0",
		},
	];
	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space>
						<Button
							type="primary"
							onClick={() => setOpenAdd(true)}>
							修改/查看《信息表》
						</Button>
						<Button
							type="primary"
							onClick={() => setOpenProcess(true)}>
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

	const [openAdd, setOpenAdd] = useState(false);
	const [openProcess, setOpenProcess] = useState(false);

	useEffect(() => {
		getAllBans(
			(list: DataType[]) => {
				setTableData(list);
			},
			(msg: string) => {
				gMsg.onError("请求不到禁止令的所有信息！" + msg);
			}
		);
	}, [tableUpdate]);

	return (
		<>
			<ProcessModal
				open={openProcess}
				setOpen={setOpenProcess}
				info={selectRecord}
			/>
			<AddModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				info={selectRecord}
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
								setSelectRecord({} as DataType);
								setOpenAdd(true);
							}}>
							添加进入特定场所/区域审批
						</Button>
					</>
				}
				cardTitle={"进入特定场所审批"}
				statisticList={[{ title: "今日审批数", value: 999 }]}
				tableOnRow={(rec: DataType) => setSelectRecord(rec)}
				tableData={staticTableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
