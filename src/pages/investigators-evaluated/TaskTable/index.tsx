import Table, { ColumnsType, ColumnType } from "antd/es/table";
import { Button, Input, InputRef, Space } from "antd";
import React, { useRef, useState } from "react";
import { Spin } from "antd/lib";
import { CheckCircleOutlined, LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import TaskVisitInfoModal from "@/pages/investigators-evaluated/Modal/TaskVisitInfoModal";
import TaskInfoModal from "@/pages/investigators-evaluated/Modal/TaskInfoModal";
import TaskModifyModal from "@/pages/investigators-evaluated/Modal/TaskModifyModal";
import { FilterConfirmProps } from "antd/es/table/interface";
// @ts-ignore
import Highlighter from "react-highlight-words";

// 调查评估表 元组的数据类型
export interface DataType {
	isFinished: boolean; // 是否结束
	WTBH: string; // 委托编号
	name: string; // 被调查人姓名
	age: number; // 被调查人年龄
	sex: string; // 被调查人性别
	tags: string[];
}


// 调查评估表的数据
export const data: DataType[] = [
	{
		isFinished: true,
		WTBH: "00000001",
		name: "张三",
		age: 32,
		sex: "男",
		tags: ["nice", "developer"]
	},
	{
		isFinished: false,
		WTBH: "22345678",
		name: "李四",
		age: 42,
		sex: "男",
		tags: ["loser"]
	},
	{
		isFinished: false,
		WTBH: "32345678",
		name: "王五",
		age: 32,
		sex: "女",
		tags: ["cool", "teacher"]
	}
];


interface ITaskForm {
	selectTask: DataType;
	setSelectTask: React.Dispatch<React.SetStateAction<DataType>>;
}


export default function TaskForm(props: ITaskForm) {
	const { selectTask, setSelectTask } = props;
	const [openInfo, setOpenInfo] = useState(false);
	const [openVisit, setOpenVisit] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	const showInfoModal = () => {
		setOpenInfo(true);
	};

	const showVisitModal = () => {
		setOpenVisit(true);
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
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			)
	});


	const columns: ColumnsType<DataType> = [
		{
			title: "进度",
			dataIndex: "isFinished",
			key: "isFinished",
			width: 50,
			render: (_, record) => {
				const { isFinished } = record;
				let loading;
				if (isFinished) loading = <Spin indicator={<LoadingOutlined />} />;
				else loading = <Spin indicator={<CheckCircleOutlined />} />;
				return loading;
			}
		},
		{
			title: "委托编号",
			dataIndex: "WTBH",
			key: "WTBH",
			width: 150,
			...getColumnSearchProps("WTBH")

		},
		{
			title: "姓名",
			dataIndex: "name",
			key: "name",
			width: 150,
			render: (text) => <a>{text}</a>,
			...getColumnSearchProps("name")
		},
		{
			title: "年龄",
			dataIndex: "age",
			key: "age",
			width: 50

		},
		{
			title: "性别",
			dataIndex: "sex",
			key: "sex",
			width: 50

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
						<Button type={"primary"} onClick={showInfoModal}>调查评估信息表</Button>
						<Button type={"primary"} onClick={showVisitModal}>调查评估走访信息</Button>
						<Button type={"primary"} onClick={showModifyModel}>修改信息</Button>
					</Space>
				);
			};
		}
	});


	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				onRow={(record) => {
					return {
						onClick: () => {
							setSelectTask(record);
						} // 点击行
					};
				}}
			/>
			{/* 显示详情 */}
			<TaskInfoModal open={openInfo} setOpen={setOpenInfo} selectTask={selectTask} />
			<TaskVisitInfoModal open={openVisit} setOpen={setOpenVisit} selectTask={selectTask} />
			<TaskModifyModal open={openModify} setOpen={setOpenModify} selectTask={selectTask} />
		</>

	);
}