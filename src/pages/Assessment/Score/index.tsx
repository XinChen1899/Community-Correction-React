import { getAllScores } from "@/api/assessment/score";
import { Score } from "@/entity/Assessment/Score/Score";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { useMessage } from "@/utils/msg/GMsg";
import { DownOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import InfoModal from "./Modal/InfoModal";
import ModifyModal from "./Modal/Modify";

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
		render: (_, record) => (
			<TemplateTag value={record.score} type={MyTagType.Info} />
		),
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
	const [history, setHistory] = useState<DataType[]>([]);

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

	useRequest(getAllScores, {
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
				tableUpdate={tableUpdate}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={<></>}
				cardTitle={"计分考核"}
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
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
