/*
* 调查评估界面下的调查评估任务表
* 业务功能：
* - 能够查看所有的调查评估任务
* */


import Table, { ColumnsType } from "antd/es/table";
import { Button, Space } from "antd";
import React from "react";
import { Spin } from "antd/lib";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";

// 调查评估表 元组的数据类型
export interface DataType {
	isFinished: boolean; // 是否结束
	id: string; // 委托编号
	name: string; // 被调查人姓名
	age: number; // 被调查人年龄
	sex: string; // 被调查人性别
	tags: string[];
}

// 调查评估表 列的定义
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
		dataIndex: "id",
		key: "id",
		width: 150

	},
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
		width: 150,
		render: (text) => <a>{text}</a>
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

// 调查评估表的数据
export const data: DataType[] = [
	{
		isFinished: true,
		id: "12345678",
		name: "张三",
		age: 32,
		sex: "男",
		tags: ["nice", "developer"]
	},
	{
		isFinished: false,
		id: "22345678",
		name: "李四",
		age: 42,
		sex: "男",
		tags: ["loser"]
	},
	{
		isFinished: false,
		id: "32345678",
		name: "王五",
		age: 32,
		sex: "女",
		tags: ["cool", "teacher"]
	}
];


interface ITaskForm {
	showModal: () => void;
	setSelectTask: React.Dispatch<React.SetStateAction<DataType>>;
}

export default function TaskForm(props: ITaskForm) {
	const { showModal, setSelectTask } = props;
	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button type={"primary"} onClick={showModal}>调查评估信息表</Button>
						<Button type={"primary"}>修改信息</Button>
					</Space>
				);
			};
		}
	});

	return (
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
	);
}