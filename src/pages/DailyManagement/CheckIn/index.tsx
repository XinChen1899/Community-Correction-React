import { getAllChecks } from "@/api/daily/check";
import { CheckInfo } from "@/entity/Daily/check/CheckInfo";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { map2Value, nsyjzlbMap } from "@/utils";
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
import InfoModal from "./Modal/InfoModal";

export type DataType = CheckInfo;

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
		align: "center",
	},
	{
		title: "对象姓名",
		dataIndex: "xm",
		align: "center",
		key: "xm",
	},
	{
		title: "管理类别",
		dataIndex: "gllb",
		align: "center",
		key: "gllb",
		render: (_, rec) => (
			<TemplateTag
				value={map2Value(nsyjzlbMap, rec.gllb)}
				type={MyTagType.Info}
			/>
		),
	},
	{
		title: "需报到次数",
		dataIndex: "check_count",
		align: "center",
		key: "check_count",
		render: (_, rec) => (
			<TemplateTag
				value={`${rec.check_count}次`}
				type={MyTagType.Warning}
			/>
		),
	},
	{
		title: "已报到次数",
		dataIndex: "count",
		align: "center",
		key: "count",
		render: (_, rec) => (
			<TemplateTag
				value={`已报到${rec.count}次`}
				type={MyTagType.Accept}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

// 定期报到
export default function CheckIn() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [selectRecord, setSelectRecord] = useState<DataType>(
		{} as DataType
	);
	const [openAdd, setOpenAdd] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setOpenInfo(true)}>
					查看报到记录
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
					<Dropdown menu={{ items }} trigger={["click"]}>
						<a onClick={(e) => e.preventDefault()}>
							<Space>
								操作
								<DownOutlined />
							</Space>
						</a>
					</Dropdown>
				);
			};
		}
	});

	useRequest(getAllChecks, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setTableData(data.data);
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	return (
		<>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
			/>
			<AddModal
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
							添加打卡信息
						</Button>
					</>
				}
				cardTitle={"定期报到"}
				statisticList={[{ title: "今天报到数", value: 999 }]}
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
