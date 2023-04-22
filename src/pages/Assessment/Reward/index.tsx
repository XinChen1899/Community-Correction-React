import { getAllRewards } from "@/api/assessment/reward";
import { RewardInfo } from "@/entity/Assessment/Reward/RewardInfo";
import TemplateNotification from "@/template/Notification";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { jllbMap, map2Value } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddModal from "./Modal/AddModal";
import InfoModal from "./Modal/InfoModal";
import ProcessLgModal from "./Modal/ProcessLgModal";
import ProcessPraiseModal from "./Modal/ProcessPraiseModal";

export type DataType = RewardInfo;

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
		title: "奖励",
		dataIndex: "jllb",
		align: "center",
		key: "jllb",
		render: (_, record) => (
			<TemplateTag
				value={map2Value(jllbMap, record.jllb)}
				type={MyTagType.Info}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function Reward() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [tableUpdate, setTableUpdate] = useState(false);

	const [openInfo, setOpenInfo] = useState(false);
	const [openPraise, setOpenPraise] = useState(false);
	const [openLg, setOpenLg] = useState(false);
	const [openAdd, setOpenAdd] = useState(false);

	const [gMsg, contextHolder] = useMessage();
	// 根据奖励的不同打开不同的审批界面
	const jllbModalMap = (jllb: string) => {
		if (jllb == "01") {
			setOpenPraise(true);
		} else if (jllb == "02") {
			setOpenLg(true);
		} else {
		}
	};

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					onClick={() => setOpenAdd(true)}>
					立功审核占位
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
							查看奖励信息
						</Button>
						<Button
							type={"primary"}
							onClick={() => jllbModalMap(record.jllb)}>
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

	useRequest(getAllRewards, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setTableData(data.data);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});
	const [showNotify, setShowNotify] = useState(false);

	return (
		<>
			<TemplateNotification
				message={"新的待办消息"}
				description={"奖励审批待办！请及时处理"}
				runCondition={showNotify}
			/>
			<ProcessLgModal
				open={openLg}
				setOpen={setOpenLg}
				info={record}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
				setNotify={setShowNotify}
			/>
			<ProcessPraiseModal
				open={openPraise}
				setOpen={setOpenPraise}
				info={record}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
			/>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={record}
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
							onClick={() => {
								setOpenAdd(true);
							}}>
							新增奖励
						</Button>
					</>
				}
				cardTitle={"奖励查询"}
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
				tableRowKey={(rec: DataType) => rec.id}
			/>
		</>
	);
}
