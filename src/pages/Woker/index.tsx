import {
	Button,
	Card,
	Col,
	Descriptions,
	message,
	Popconfirm,
	Row,
	Space,
	Statistic,
} from "antd";
import {
	CheckCircleOutlined,
	CloseCircleFilled,
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { Spin } from "antd/lib";
import { useState } from "react";
import TemplateHome from "@/template/OperatorAndTable";
import AddModal from "./Modal/AddModal/AddPeople";

export interface DataType {
	id: number;
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
		width: 150,
	},
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "性别",
		dataIndex: "sex",
		key: "sex",
	},
	{
		title: "是否调查评估",
		dataIndex: "sfdcpg",
		key: "sfdcpg",
		align: "center",
		render: (_, record) => {
			const { sfdcpg } = record;
			let loading;
			if (sfdcpg)
				loading = (
					<Spin indicator={<CheckCircleOutlined />} />
				);
			else loading = <Spin indicator={<CloseCircleFilled />} />;
			return loading;
		},
		width: 120,
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function Worker() {
	const [messageApi, contextHolder] = message.useMessage();
	const [addModalOpen, setAddModalOpen] = useState(false);

	const showAddModal = () => {
		setAddModalOpen(true);
	};

	const successMsg = (msg: string) => {
		messageApi.open({
			type: "success",
			content: msg,
		});
	};

	const errorMsg = (msg: string) => {
		messageApi.open({
			type: "error",
			content: msg,
		});
	};

	const dataCollection = {
		totalNumber: 0,
	};

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button type={"dashed"} onClick={() => {}}>
							矫正对象信息表
						</Button>
						<Button
							type={"dashed"}
							danger
							icon={<EditOutlined />}
							onClick={() => {}}>
							修改信息
						</Button>
						<Button
							type={"dashed"}
							icon={<SearchOutlined />}
							onClick={() => {}}>
							查看矫正方案
						</Button>

						<Popconfirm
							title="是否删除"
							description="是否删除该调查评估信息！"
							onOpenChange={() =>
								console.log("open change")
							}>
							<Button
								type={"primary"}
								danger
								icon={<DeleteOutlined />}>
								删除!
							</Button>
						</Popconfirm>
					</Space>
				);
			};
		}
	});

	const tableData: DataType[] = [
		{
			id: 1,
			dxbh: "111",
			name: "xxx",
			sex: "male",
			sfdcpg: true,
		},
	];

	return (
		<div>
			<AddModal
				open={addModalOpen}
				setOpen={setAddModalOpen}
				gMsg={{
					onSuccess: successMsg,
					onError: errorMsg,
				}}
			/>
			{contextHolder}
			<TemplateHome
				columns={columns}
				cardExtra={undefined}
				cardTitle={"入矫人员统计"}
				statisticList={[
					{ title: "矫正人员总数", value: 999 },
					{ title: "今日新增矫正人员", value: 999 },
				]}
				tableData={tableData.length ? tableData : []}
				tableOnRow={undefined}
			/>
		</div>
	);
}
