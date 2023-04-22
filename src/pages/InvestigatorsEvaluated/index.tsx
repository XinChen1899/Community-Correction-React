import { finishIE, getAllIEInfos } from "@/api/ie";
import { IEInfo } from "@/entity/IE/IEInfo";
import { useMyNotification } from "@/template/Notification";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { map2Value, wtdwMap } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import {
	AppstoreTwoTone,
	CheckCircleOutlined,
	CheckCircleTwoTone,
	DownOutlined,
	EditTwoTone,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, Space, Spin } from "antd";
import { ColumnsType } from "antd/es/table";
import { MenuProps } from "antd/lib";
import "react";
import { useState } from "react";
import SuggestModal from "./Modal/SuggestModal";
import TaskAddTimeModal from "./Modal/TaskAddTimeModal";
import TaskInfoModal from "./Modal/TaskInfoModal";
import TaskModifyModal from "./Modal/TaskModifyModal";
import TaskRecvModal from "./Modal/TaskRecvModal";

/**
 * 调查评估:
 * 功能:
 * 1.新增调查评估任务。
 * 2.查询显示所有调查评估任务记录。
 * 3.查看流程节点记录。
 */

export type DataType = IEInfo;
const columns: ColumnsType<DataType> = [
	{
		title: "进度",
		dataIndex: "isFinished",
		key: "isFinished",
		align: "center",
		width: 100,
		render: (_, record) => {
			const { finish } = record;
			let loading;
			if (finish != 0) loading = <a>还需{finish}日</a>;
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
		align: "center",
		key: "wtbh",
		width: 150,
	},
	{
		title: "委托单位",
		dataIndex: "wtdw",
		align: "center",
		key: "wtdw",
		width: 150,
		render: (_, record) => (
			<TemplateTag
				value={map2Value(wtdwMap, record.wtdw)}
				type={MyTagType.Info}
			/>
		),
	},
	{
		title: "姓名",
		dataIndex: "bgrxm",
		align: "center",
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

	useRequest(getAllIEInfos, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setTableData(data.data);
			}
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
					icon={<EditTwoTone />}
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
					icon={<EditTwoTone />}
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
					icon={<AppstoreTwoTone />}
					onClick={() => setOpenAddTime(true)}>
					修改调查期限
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
						finishIE(
							selectRecord,
							() => {
								setTableUpdate(!tableUpdate);
								gMsg.onSuccess(
									"给委托方发送调查评估意见书"
								);
								gMsg.onSuccess(
									"给检察方抄送调查评估意见书"
								);
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
							type={"link"}
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
		}
	});

	const [notifyContext, openNotification] = useMyNotification(
		"调查评估待办",
		"您有一条「调查评估」待办信息，请及时处理"
	);

	return (
		<>
			{notifyContext}
			{contextHolder}
			<SuggestModal
				open={openSuggest}
				setOpen={setOpenSuggest}
				wtbh={selectRecord.wtbh}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<TaskRecvModal
				open={openRecv}
				setOpen={setOpenRecv}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
				openNotification={openNotification}
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
								(item) => {
									const wtdw = map2Value(
										wtdwMap,
										item.wtdw
									);
									return wtdw.includes(value);
								}
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
