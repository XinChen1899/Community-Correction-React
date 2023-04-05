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
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddModal from "./Modal/AddModal/AddTeam";
import TemplateHome from "@/pages/template/TemplateHome";

export interface DataType {
	id: string; // 小组编号
	monitorName: string; // 组长姓名
	teamNumber: number; // 小组人数
}

const columns: ColumnsType<DataType> = [
	{
		title: "小组编号",
		dataIndex: "id",
		key: "id",
		width: 150,
	},
	{
		title: "组长姓名",
		dataIndex: "monitorName",
		key: "monitorName",
	},
	{
		title: "小组人数",
		dataIndex: "teamNumber",
		key: "teamNumber",
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function CorrectionTeam() {
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
							小组信息
						</Button>
						<Button
							type={"dashed"}
							danger
							icon={<EditOutlined />}
							onClick={() => {}}>
							修改小组信息
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
			id: "1",
			monitorName: "谢xx",
			teamNumber: 3,
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
				cardExtra={
					<>
						<Space direction={"horizontal"}>
							<Button
								onClick={() => {
									showAddModal();
								}}
								type={"primary"}
								icon={<PlusOutlined />}>
								新增矫正小组
							</Button>
						</Space>
					</>
				}
				cardTitle={"矫正小组统计"}
				statisticList={[
					{ title: "矫正小组总数", value: 999 },
				]}
				tableData={tableData.length ? tableData : []}
				tableOnRow={undefined}
			/>
		</div>
	);
}
