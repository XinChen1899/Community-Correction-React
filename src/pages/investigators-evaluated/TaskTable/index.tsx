/*
* 调查评估界面下的调查评估任务表
* 业务功能：
* - 能够查看所有的调查评估任务
* */


import Table, { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import React from "react";

// 调查评估表 元组的数据类型
export interface DataType {
	key: string;
	name: string;
	age: number;
	sex: string;
	address: string;
	tags: string[];
}

// 调查评估表 列的定义
const columns: ColumnsType<DataType> = [
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>
	},
	{
		title: "年龄",
		dataIndex: "age",
		key: "age"
	},
	{
		title: "性别",
		dataIndex: "sex",
		key: "sex"
	},
	{
		title: "家庭住址",
		dataIndex: "address",
		key: "address"
	},
	{
		title: "操作",
		key: "action",
		render: (_, record) => {
			return (
				<Space size="middle">
					<a>
						查看调查报告 {record.name}
					</a>
				</Space>
			);
		}
	}
];

// 调查评估表的数据
export const data: DataType[] = [
	{
		key: "1",
		name: "张三",
		age: 32,
		sex: "男",
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"]
	},
	{
		key: "2",
		name: "李四",
		age: 42,
		sex: "男",
		address: "London No. 1 Lake Park",
		tags: ["loser"]
	},
	{
		key: "3",
		name: "王五",
		age: 32,
		sex: "女",
		address: "Sydney No. 1 Lake Park",
		tags: ["cool", "teacher"]
	}
];


interface ITaskForm {
	showModal: () => void;
	setSelectTask: React.Dispatch<React.SetStateAction<DataType>>;
}

export default function TaskForm(props: ITaskForm) {
	const { showModal, setSelectTask } = props;
	return (
		<Table
			columns={columns}
			dataSource={data}
			onRow={(record) => {
				return {
					onClick: () => {
						setSelectTask(record);
						showModal();
					} // 点击行
				};
			}}
		/>
	);
}