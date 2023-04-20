import { getAllBans } from "@/api/business/ban";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { TagType } from "@/template/Tag";
import { useMessage } from "@/utils/msg/GMsg";
import {
	DownOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddModal from "./Modal/AddModal";
import ProcessModal from "./Modal/ProcessModal";

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
		render: (_, rec) => (
			<TemplateTag value={rec.sqjrcs} type={TagType.Info} />
		),
	},
	{
		title: "审批结果",
		dataIndex: "xjsqjzjgspyj",
		key: "xjsqjzjgspyj",
		render: (_, rec) => (
			<TemplateTag
				value={rec.xjsqjzjgspyj}
				type={TagType.Accept}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];
export default function VisitorApproval() {
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

	useRequest(getAllBans, {
		onSuccess: ({ data }) => {
			setTableData(data.data);
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	return (
		<>
			<ProcessModal
				open={openProcess}
				setOpen={setOpenProcess}
				info={selectRecord}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
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
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
