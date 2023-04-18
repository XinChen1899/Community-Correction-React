import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import {
	EditOutlined,
	DeleteOutlined,
	DownOutlined,
	PlusOutlined,
	CheckCircleFilled,
	LoadingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import { getAllAnnounces } from "@/api/ic/announce";
import { getDate } from "@/utils/ie";
import AddAnnouncementModal from "../Modal/AddAnnounceInfo";
import AnnounceInfoModal from "../Modal/AnnounceInfo";

export type DataType = CrpAnnouncement;

const defaultDataType: DataType = {
	dxbh: "12",
	xm: "2112",
	xgrq: "21121",
	finish: false,
	audio: "",
};

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
	},
	{
		title: "对象姓名",
		dataIndex: "xm",
		key: "xm",
	},
	{
		title: "宣告日期",
		dataIndex: "xgrq",
		key: "xgrq",
		render: (_, record) => getDate(record.xgrq),
	},
	{
		title: "是否宣告",
		dataIndex: "finish",
		key: "finish",
		render: (_, record) => {
			const { finish } = record;
			if (finish) return <CheckCircleFilled />;
			else return <LoadingOutlined />;
		},
	},
	{
		title: "操作",
		key: "action",
	},
];

// 入矫宣告
export default function UncorrectedAnnouncement() {
	const [gMsg, contextHolder] = useMessage();
	const [history, setHistory] = useState<DataType[]>([]);

	const [tableUpdate, setTableUpdate] = useState(false);
	const [tableData, setTableData] = useState<DataType[]>([
		defaultDataType,
	]);
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
					修改宣告书
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
							查看宣告书
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
	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	// useEffect(() => {
	// 	getAllAnnounces(
	// 		(infoList: CrpAnnouncement[]) => {
	// 			setTableData(infoList);
	// 		},
	// 		(msg: string) =>
	// 			gMsg.onError("请求不到入矫宣告的所有信息！" + msg)
	// 	);
	// }, [tableUpdate]);

	return (
		<>
			<AnnounceInfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
			/>
			<AddAnnouncementModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
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
							onClick={() => setOpenAdd(true)}>
							添加解矫宣告
						</Button>
					</>
				}
				cardTitle={"解矫宣告信息"}
				statisticList={[
					{ title: "入矫宣告总数", value: 999 },
				]}
				searchList={[
					{
						placeholder: "请输入对象编号",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.dxbh.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
					{
						placeholder: "请输入对象姓名",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.xm.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
				]}
				tableOnRow={(rec: DataType) => setSelectRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}