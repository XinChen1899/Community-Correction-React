import { Button, message, Popconfirm, Space } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddTeamModal from "./Modal/AddTeamModal";
import TemplateHome from "@/template/TemplateHome";
import TeamInfoModal from "./Modal/TeamInfoModal";
import TeamModifyModal from "./Modal/TeamModifyModal";
import { GMessage } from "@/coderepo/msg/GMsg";

export interface DataType {
	id: string; // 小组编号
	teamName: string; // 小组名
	monitorName: string; // 组长姓名
	teamNumber: number; // 小组人数
}

const defaultDataType: DataType = {
	id: "",
	teamName: "",
	monitorName: "",
	teamNumber: 0,
};

const columns: ColumnsType<DataType> = [
	{
		title: "小组编号",
		dataIndex: "id",
		key: "id",
		width: 150,
	},
	{
		title: "小组名",
		dataIndex: "teamName",
		key: "teamName",
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
	const [teamInfoModalOpen, setTeamInfoModalOpen] = useState(false);
	const [teamModifyModalOpen, setTeamModifyModalOpen] =
		useState(false);

	const [selectRecord, setSelectRecord] =
		useState<DataType>(defaultDataType);

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

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() =>
								setTeamInfoModalOpen(true)
							}>
							小组信息
						</Button>
						<Button
							type={"dashed"}
							danger
							icon={<EditOutlined />}
							onClick={() =>
								setTeamModifyModalOpen(true)
							}>
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
			teamName: "team1",
			monitorName: "谢xx",
			teamNumber: 3,
		},
	];

	const gMsg: GMessage = {
		onSuccess: successMsg,
		onError: errorMsg,
	};

	return (
		<div>
			<AddTeamModal
				open={addModalOpen}
				setOpen={setAddModalOpen}
				gMsg={gMsg}
			/>
			<TeamInfoModal
				open={teamInfoModalOpen}
				setOpen={setTeamInfoModalOpen}
				selectRecord={selectRecord}
			/>
			<TeamModifyModal
				open={teamModifyModalOpen}
				setOpen={setTeamModifyModalOpen}
				selectRecord={selectRecord}
				gMsg={gMsg}
			/>
			{contextHolder}
			<TemplateHome
				columns={columns}
				cardExtra={
					<>
						<Space direction={"horizontal"}>
							<Button
								onClick={() => {
									setAddModalOpen(true);
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
				tableOnRow={(record: any) => setSelectRecord(record)}
			/>
		</div>
	);
}
