import * as React from "react";
import {
	Button,
	Card,
	Descriptions,
	message,
	Popconfirm,
	Space
} from "antd";
import {
	CheckCircleOutlined,
	CheckOutlined, CloseCircleFilled,
	CloseOutlined,
	DeleteOutlined,
	EditOutlined, LoadingOutlined,
	PlusOutlined
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { Spin } from "antd/lib";
import AddModal
	from "@/pages/income-correction/WaitPeople/Modal/AddModal/AddPeople";
import { useState } from "react";

export interface DataType {
	dxbh: string; // 对象编号
	name: string; // 矫正对象姓名
	sex: string; //性别
	sfdcpg: boolean; // 是否调查评估
}

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
		width: 150
	},
	{
		title: "姓名",
		dataIndex: "name",
		key: "name"
	},
	{
		title: "性别",
		dataIndex: "sex",
		key: "sex"
	},
	{
		title: "是否调查评估",
		dataIndex: "sfdcpg",
		key: "sfdcpg",
		align: "center",
		render: (_, record) => {
			const { sfdcpg } = record;
			let loading;
			if (sfdcpg) loading =
				<Spin indicator={<CheckCircleOutlined />} />;
			else loading =
				<Spin indicator={<CloseCircleFilled />} />;
			return loading;
		},
		width: 120
	},
	{
		title: "操作",
		key: "action"
	}
];


export default function WaitPeople() {
	const [messageApi, contextHolder] = message.useMessage();
	const [addModalOpen, setAddModalOpen] = useState(false);

	const showAddModal = () => {
		setAddModalOpen(true);
	};

	const successMsg = (msg: string) => {
		messageApi.open({
			type: "success",
			content: msg
		});
	};

	const errorMsg = (msg: string) => {
		messageApi.open({
			type: "error",
			content: msg
		});
	};

	const dataCollection = {
		totalNumber: 0
	};

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button type={"dashed"}
								onClick={() => {
								}}>矫正对象信息表</Button>
						<Button type={"dashed"} danger
								icon={<EditOutlined />}
								onClick={() => {
								}}>修改信息</Button>

						<Popconfirm
							title="是否删除"
							description="是否删除该调查评估信息！"
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

	const tableData: DataType[] = [{
		dxbh: "111",
		name: "xxx",
		sex: "male",
		sfdcpg: true
	}];

	return (
		<div>
			<AddModal open={addModalOpen} setOpen={setAddModalOpen}
					  gMsg={{
						  onSuccess: successMsg,
						  onError: errorMsg
					  }} />
			{contextHolder}
			<Space direction={"vertical"}>
				<Card title={"待入矫人员统计"} extra={<>
					<Space direction={"horizontal"}>
						<Button onClick={() => {
							showAddModal();
						}}
								type={"primary"}
								icon={<PlusOutlined />}>
							登记待入矫人员
						</Button>
						<Button onClick={() => {
							showAddModal();
						}}
								type={"primary"}
								icon={<PlusOutlined />}>
							入矫登记
						</Button>
					</Space>

				</>}>
					<Descriptions>
						<Descriptions.Item label="待入矫人员总数">
							{dataCollection.totalNumber}
						</Descriptions.Item>
					</Descriptions></Card>

				<Table
					columns={columns}
					dataSource={tableData.length ? tableData : []}
					rowKey={(record) => record.dxbh}
					onRow={(record) => {
						return {
							onClick: () => {
								// setSelectTask(record);
							} // 点击行
						};
					}}
				/>
			</Space>

		</div>
	);
};