import { getAllBans } from "@/api/business/ban";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import TemplateNotification from "@/template/Notification";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { TagType } from "@/template/Tag";
import { map2Value, spjgMap } from "@/utils";
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
		align: "center",
		key: "dxbh",
	},
	{
		title: "申请对象姓名",
		dataIndex: "xm",
		align: "center",
		key: "xm",
	},
	{
		title: "申请进入的场所",
		dataIndex: "sqjrcs",
		align: "center",
		key: "sqjrcs",
		render: (_, rec) => (
			<TemplateTag value={rec.sqjrcs} type={TagType.Info} />
		),
	},
	{
		title: "审批结果",
		dataIndex: "spjg",
		align: "center",
		key: "spjg",
		render: (_, rec) => (
			<TemplateTag
				value={map2Value(spjgMap, rec.spjg)}
				type={
					rec.spjg == "01" ? TagType.Accept : TagType.Error
				}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];
export default function BanOrder() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

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
	const [showNotify, setShowNotify] = useState(false);

	useRequest(getAllBans, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				if (
					selectRecord != undefined &&
					selectRecord.dxbh != ""
				) {
					for (let i = 0; i < data.data.length; i++) {
						if (data.data[i].dxbh == selectRecord.dxbh) {
							setSelectRecord(data.data[i]);
							break;
						}
					}
				}
				setTableData(data.data);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	return (
		<>
			<TemplateNotification
				message={"新的待办消息"}
				description={"禁止令待办！请及时处理"}
				runCondition={showNotify}
			/>
			<ProcessModal
				open={openProcess}
				setOpen={setOpenProcess}
				info={selectRecord}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
				setNotify={setShowNotify}
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
					{
						placeholder: "请输入审批结果",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.spjg.includes(value)
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
