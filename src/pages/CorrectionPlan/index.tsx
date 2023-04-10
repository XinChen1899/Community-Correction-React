import {
	Button,
	message,
	Popconfirm,
	Space,
} from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddModal from "./Modal/AddModal/AddTeam";
import TemplateHome from "@/template/OperatorAndTable";

export interface DataType {
	id: string; // 小组编号
	name: string; // 矫正对象姓名
}

const columns: ColumnsType<DataType> = [
	{
		title: "方案编号",
		dataIndex: "id",
		key: "id",
		width: 150,
	},
	{
		title: "矫正对象姓名",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function CorrectionPlan() {
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
							查看矫正方案
						</Button>
						<Button
							type={"dashed"}
							danger
							icon={<EditOutlined />}
							onClick={() => {}}>
							修改矫正方案
						</Button>

						<Popconfirm
							title="是否删除"
							description="是否删除该调矫正方案！"
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
			name: "张三",
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
								新增矫正方案
							</Button>
						</Space>
					</>
				}
				cardTitle={"矫正方案统计"}
				statisticList={[
					{ title: "矫正方案总数", value: 999 },
				]}
				tableData={tableData.length ? tableData : []}
				tableOnRow={undefined}
			/>
		</div>
	);
}
