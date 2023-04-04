import Table, { ColumnsType, ColumnType } from "antd/es/table";
import { Button, Input, InputRef, Popconfirm, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Spin } from "antd/lib";
import {
	CheckCircleOutlined, DeleteOutlined, EditOutlined,
	LoadingOutlined,
	SearchOutlined
} from "@ant-design/icons";

import TaskInfoModal
	from "@/pages/investigators-evaluated/Modal/TaskInfoModal";
import TaskModifyModal
	from "@/pages/investigators-evaluated/Modal/TaskModifyModal";
import { FilterConfirmProps } from "antd/es/table/interface";
// @ts-ignore
import Highlighter from "react-highlight-words";
import axios from "axios";
import { IEInfo } from "@/entity/IE/IEInfo";
import { GMessage } from "@/coderepo/msg/GMsg";

// 调查评估表 元组的数据类型
export interface DataType {
	isFinished: boolean; // 是否结束
	wtbh: string; // 委托编号
	name: string; // 被调查人姓名
}

interface ITaskForm {
	selectTask: DataType;
	setSelectTask: React.Dispatch<React.SetStateAction<DataType>>;
	tableUpdate: boolean,
	setTableUpdate: React.Dispatch<React.SetStateAction<boolean>>;
	gMsg: GMessage
}

const ieInfo2DataType = (infoList: IEInfo[]) => {
	return infoList.map((item: IEInfo) => {
		return {
			isFinished: false,
			wtbh: item.wtbh,
			name: item.bgrxm
		} as DataType;
	});
};
export default function TaskForm(props: ITaskForm) {
	const {
		selectTask,
		setSelectTask,
		tableUpdate,
		setTableUpdate,
		gMsg
	} = props;
	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [taskUpdate, setTaskUpdate] = useState(false);

	const fetchData = () => {
		axios.get("http://localhost:9006/ie/all")
			 .then((res) => {
				 setTableData(ieInfo2DataType(res.data));
			 });
	};

	useEffect(() => {
		fetchData();
	}, [tableUpdate]);

	const showInfoModal = () => {
		setOpenInfo(true);
	};


	const showModifyModel = () => {
		setOpenModify(true);
	};


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

	const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
		filterDropdown: ({
							 setSelectedKeys,
							 selectedKeys,
							 confirm,
							 clearFilters,
							 close
						 }) => (
			<div style={{ padding: 8 }}
				 onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }} />
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
						padding: 0
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			)
	});

	const confirm = () => {
		console.log("delete");
	};


	const columns: ColumnsType<DataType> = [
		{
			title: "进度",
			dataIndex: "isFinished",
			key: "isFinished",
			width: 50,
			render: (_, record) => {
				const { isFinished } = record;
				let loading;
				if (!isFinished) loading =
					<Spin indicator={<LoadingOutlined />} />;
				else loading =
					<Spin indicator={<CheckCircleOutlined />} />;
				return loading;
			}
		},
		{
			title: "委托编号",
			dataIndex: "wtbh",
			key: "wtbh",
			width: 150,
			...getColumnSearchProps("wtbh")
		},
		{
			title: "姓名",
			dataIndex: "name",
			key: "name",
			width: 150,
			...getColumnSearchProps("name")
		},
		{
			title: "操作",
			key: "action",
			width: 200
		}
	];
	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button type={"dashed"}
								onClick={showInfoModal}>调查评估信息表</Button>
						<Button type={"dashed"} danger
								icon={<EditOutlined />}
								onClick={showModifyModel}>修改信息</Button>

						<Popconfirm
							title="是否删除"
							description="是否删除该调查评估信息！"
							onConfirm={confirm}
							onOpenChange={() => console.log("open change")}
						>
							<Button type={"primary"} danger
									icon={<DeleteOutlined />}
							>删除!</Button>
						</Popconfirm>
					</Space>
				);
			};
		}
	});

	return (
		<>
			<Table
				columns={columns}
				dataSource={tableData.length ? tableData : []}
				rowKey={(record) => record.wtbh}
				onRow={(record) => {
					return {
						onClick: () => {
							setSelectTask(record);
						} // 点击行
					};
				}}
			/>
			{/* 显示详情 */}
			<TaskInfoModal open={openInfo} setOpen={setOpenInfo}
						   selectTask={selectTask}
						   taskUpdate={taskUpdate}
			/>
			<TaskModifyModal open={openModify} setOpen={setOpenModify}
							 selectTask={selectTask}
							 setTableUpdate={setTableUpdate}
							 setTaskUpdate={setTaskUpdate}
							 tableUpdate={tableUpdate}
							 taskUpdate={taskUpdate}
							 gMsg={gMsg}
			/>
		</>

	);
}