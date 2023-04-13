import {
	Button,
	Dropdown,
	Input,
	InputRef,
	Space,
	Spin,
	Tag,
} from "antd";
// @ts-ignore
import Highlighter from "react-highlight-words";
import "react";
import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import {
	LoadingOutlined,
	CheckCircleOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
	InfoCircleFilled,
	DownOutlined,
	AppstoreAddOutlined,
	CheckCircleTwoTone,
} from "@ant-design/icons";
import { ColumnType, ColumnsType } from "antd/es/table";
import { GMessage, useMessage } from "@/utils/msg/GMsg";
import {
	getAllIEInfos,
	getCount,
	updateIEInfoTimeData,
} from "@/api/ie";
import { IEInfo } from "@/entity/IE/IEInfo";
import { FilterConfirmProps } from "antd/es/table/interface";
import TaskInfoModal from "./Modal/TaskInfoModal";
import TaskModifyModal from "./Modal/TaskModifyModal";
import { MenuProps } from "antd/lib";
import TaskAddTimeModal from "./Modal/TaskAddTimeModal";
import TaskRecvModal from "./Modal/TaskRecvModal";
import { map2Value, wtdwMap } from "@/utils";
import SuggestModal from "./Modal/SuggestModal";

/**
 * 调查评估:
 * 功能:
 * 1.新增调查评估任务。
 * 2.查询显示所有调查评估任务记录。
 * 3.查看流程节点记录。
 */

// 调查评估表 元组的数据类型
export type DataType = IEInfo;
// export interface DataType {
// 	id: number;
// 	isFinished: number; // 是否结束
// 	wtbh: string; // 委托编号
// 	name: string; // 被调查人姓名
// 	wtdw: string; // 委托单位
// }

export default function IE() {
	const [selectTask, setSelectTask] = useState<DataType>(
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

	const [gMsg, contextHolder] = useMessage();

	const [infoCount, setInfoCount] = useState(0);

	const [taskUpdate, setTaskUpdate] = useState(false);

	useEffect(() => {
		getAllIEInfos(
			(infoList: IEInfo[]) => {
				setTableData(infoList);
			},
			(msg: string) =>
				gMsg.onError("请求不到调查评估的所有信息！" + msg)
		);
		getCount(setInfoCount);
	}, [tableUpdate]);

	type DataIndex = keyof DataType;
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef<InputRef>(null);

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText("");
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div
				style={{ padding: 8 }}
				onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(
							e.target.value ? [e.target.value] : []
						)
					}
					onPressEnter={() =>
						handleSearch(
							selectedKeys as string[],
							confirm,
							dataIndex
						)
					}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(
								selectedKeys as string[],
								confirm,
								dataIndex
							)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}>
						Search
					</Button>
					<Button
						onClick={() =>
							clearFilters && handleReset(clearFilters)
						}
						size="small"
						style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText(
								(selectedKeys as string[])[0]
							);
							setSearchedColumn(dataIndex);
						}}>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: "#ffc069",
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	const confirm = () => {
		console.log("delete");
	};
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
			...getColumnSearchProps("wtbh"),
		},
		{
			title: "委托单位",
			dataIndex: "wtdw",
			key: "wtdw",
			width: 150,
			...getColumnSearchProps("wtdw"),
		},
		{
			title: "姓名",
			dataIndex: "bgrxm",
			key: "bgrxm",
			width: 150,
			...getColumnSearchProps("bgrxm"),
		},
		{
			title: "操作",
			key: "action",
			width: 200,
		},
	];

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
							wtbh: selectTask.wtbh,
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
							dcpgyj: "",
							dcyjshr: "",
							dcpgyjs: "",
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
				wtbh={selectTask.wtbh}
				gMsg={gMsg}
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
				time={selectTask.finish}
				gMsg={gMsg}
				wtbh={selectTask.wtbh}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>

			<TaskInfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectTask}
				taskUpdate={taskUpdate}
				gMsg={gMsg}
			/>
			<TaskModifyModal
				open={openModify}
				setOpen={setOpenModify}
				info={selectTask}
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
				cardTitle={"调查评估操作区"}
				statisticList={[
					{ title: "调查评估总数", value: 999 },
					{ title: "今日新增调查评估数", value: 999 },
					{
						title: "正在处理中的调查评估数",
						value: 999,
					},
				]}
				tableOnRow={(record: any) => {
					setSelectTask(record);
				}}
				tableRowKey={(rec: DataType) => rec.wtbh}
			/>
		</>
	);
}
