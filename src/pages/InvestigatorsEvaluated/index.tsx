import { Button, Dropdown, Space, Spin, Tag } from "antd";
import "react";
import { useState } from "react";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import {
	LoadingOutlined,
	CheckCircleOutlined,
	EditOutlined,
	PlusOutlined,
	DownOutlined,
	AppstoreAddOutlined,
	CheckCircleTwoTone,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useMessage } from "@/utils/msg/GMsg";
import { getAllIEInfos, updateIEInfoTimeData } from "@/api/ie";
import { IEInfo } from "@/entity/IE/IEInfo";
import TaskInfoModal from "./Modal/TaskInfoModal";
import TaskModifyModal from "./Modal/TaskModifyModal";
import { MenuProps } from "antd/lib";
import TaskAddTimeModal from "./Modal/TaskAddTimeModal";
import TaskRecvModal from "./Modal/TaskRecvModal";
import { map2Value, wtdwMap } from "@/utils";
import SuggestModal from "./Modal/SuggestModal";
import { useRequest } from "ahooks";

/**
 * 调查评估:
 * 功能:
 * 1.新增调查评估任务。
 * 2.查询显示所有调查评估任务记录。
 * 3.查看流程节点记录。
 */

// 调查评估表 元组的数据类型
export type DataType = IEInfo;
const columns: ColumnsType<DataType> = [
	{
		title: "进度",
		dataIndex: "isFinished",
		key: "isFinished",
		width: 100,
		render: (_, record) => {
			const { finish } = record;
			let loading;
			if (finish != 0)
				loading = (
					<Space>
						<Spin indicator={<LoadingOutlined />} />
						还需{finish}日
					</Space>
				);
			else
				loading = (
					<Spin indicator={<CheckCircleOutlined />} />
				);
			return loading;
		},
	},
	{
		title: "委托编号",
		dataIndex: "wtbh",
		key: "wtbh",
		width: 150,
	},
	{
		title: "委托单位",
		dataIndex: "wtdw",
		key: "wtdw",
		width: 150,
	},
	{
		title: "姓名",
		dataIndex: "bgrxm",
		key: "bgrxm",
		width: 150,
	},
	{
		title: "操作",
		key: "action",
		width: 200,
	},
];

export default function IE() {
	const [selectRecord, setSelectRecord] = useState<DataType>(
		{} as DataType
	);
	// 是否需要更新表格
	const [tableUpdate, setTableUpdate] = useState(false);

	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);
	const [openRecv, setOpenRecv] = useState(false);
	const [openAddTime, setOpenAddTime] = useState(false);
	const [openSuggest, setOpenSuggest] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [gMsg, contextHolder] = useMessage();

	const [taskUpdate, setTaskUpdate] = useState(false);

	useRequest(getAllIEInfos, {
		onSuccess: ({ data }) => {
			setTableData(data.data);
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setOpenModify(true)}>
					修改信息
				</Button>
			),
			key: "0",
		},
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setOpenSuggest(true)}>
					调查评估意见书编辑
				</Button>
			),
			key: "1",
		},
		{
			label: (
				<Button
					block
					type="text"
					icon={<AppstoreAddOutlined />}
					onClick={() => setOpenAddTime(true)}>
					延长调查期限
				</Button>
			),
			key: "2",
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
						gMsg.onSuccess("给委托方发送调查评估意见书");
						gMsg.onSuccess("给检察方抄送调查评估意见书");
						const info: IEInfo = {
							wtbh: selectRecord.wtbh,
							finish: 0,
							wtdw: "",
							wtdch: "",
							bdcpgrdlx: "",
							bgrxm: "",
							bgrsfzh: "",
							bgrxb: "",
							bgrcsrq: "",
							bgrjzddz: "",
							bgrgzdw: "",
							zm: "",
							ypxq: "",
							ypxqksrq: "",
							ypxqjsrq: "",
							ypxf: "",
							fjx: "",
							pjjg: "",
							pjrq: "",
							nsyjzlb: "",
							dcdwxqj: "",
						};
						updateIEInfoTimeData(
							info,
							() => {
								setTableUpdate(!tableUpdate);
								setTaskUpdate(!taskUpdate);
							},
							() => {
								gMsg.onError("完成失败!");
							}
						);
					}}
					icon={<CheckCircleTwoTone />}>
					完成
				</Button>
			),
			key: "3",
		},
	];

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = () => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => setOpenInfo(true)}>
							调查评估信息表
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
		} else if (column.key == "wtdw") {
			column.render = (_, rec) => (
				<Tag>{map2Value(wtdwMap, rec.wtdw)}</Tag>
			);
		}
	});

	return (
		<>
			{contextHolder}
			<SuggestModal
				open={openSuggest}
				setOpen={setOpenSuggest}
				taskUpdate={false}
				wtbh={selectRecord.wtbh}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<TaskRecvModal
				open={openRecv}
				setOpen={setOpenRecv}
				tableUpdate={tableUpdate}
				taskUpdate={taskUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
			/>
			<TaskAddTimeModal
				open={openAddTime}
				setOpen={setOpenAddTime}
				time={selectRecord.finish}
				gMsg={gMsg}
				wtbh={selectRecord.wtbh}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>

			<TaskInfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
				taskUpdate={taskUpdate}
				gMsg={gMsg}
			/>
			<TaskModifyModal
				open={openModify}
				setOpen={setOpenModify}
				info={selectRecord}
				setTableUpdate={setTableUpdate}
				tableUpdate={tableUpdate}
				gMsg={gMsg}
			/>

			<TemplateOperatorAndTable
				tableData={tableData}
				columns={columns}
				cardExtra={
					<>
						<Space>
							<Button
								onClick={() => setOpenRecv(true)}
								type={"primary"}
								icon={<PlusOutlined />}>
								接受委托
							</Button>
						</Space>
					</>
				}
				cardTitle={"调查评估"}
				statisticList={[
					{ title: "调查评估总数", value: 999 },
					{ title: "今日新增调查评估数", value: 999 },
					{
						title: "正在处理中的调查评估数",
						value: 999,
					},
				]}
				searchList={[
					{
						placeholder: "请输入委托编号",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.wtbh.includes(value)
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
								(item) => item.bgrxm.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
					{
						placeholder: "请输入委托单位",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.wtdw.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
				]}
				tableOnRow={(record: DataType) =>
					setSelectRecord(record)
				}
				tableRowKey={(rec: DataType) => rec.wtbh}
			/>
		</>
	);
}
