import TemplateModal from "@/template/Modal";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import TaskInfoModal from "../TaskInfoModal";

interface DataType {
	id: number;
	processId: string;
	taskId: string;
	name: string;
	assignee: string;
	wtbh: string;
}

const defaultTableData: DataType[] = [
	{
		id: 1,
		processId: "xxx",
		wtbh: "99999999",
		taskId: "xxx",
		name: "决定方",
		assignee: "decision",
	},
];

const columns: ColumnsType<DataType> = [
	{
		title: "流程id",
		dataIndex: "processId",
		key: "processId",
		width: 150,
	},
	{
		title: "委托编号",
		dataIndex: "wtbh",
		key: "wtbh",
		width: 150,
	},
	{
		title: "操作",
		key: "action",
		width: 200,
	},
];

export default function TaskRecvModal(props: {
	open: boolean;
	setOpen: any;
	tableUpdate: boolean;
	taskUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
}) {
	const {
		open,
		setOpen,
		tableUpdate,
		setTableUpdate,
		gMsg,
		taskUpdate,
	} = props;
	const [tableData, setTableData] =
		useState<DataType[]>(defaultTableData);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [record, setRecord] = useState<DataType>({
		id: 1,
		processId: "xxx",
		wtbh: "",
		taskId: "xxx",
		name: "决定方",
		assignee: "decision",
	} as DataType);
	const [recvUpdate, setRecvUpdate] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios
				.get(
					"http://localhost:9006/task/tasks?assignee=decision"
				)
				.then(({ data }) => data.data);
			console.log(result);
			setTableData(result);
		};
		fetchData();
	}, [recvUpdate]);

	const back = async () => {
		await axios.post(
			`http://localhost:9006/task/apply?tid=1&wtbh=${record.wtbh}&processId=${record.processId}&checkResult=驳回`
		);
		setRecvUpdate(!recvUpdate);
		gMsg.onSuccess("已退回调查评估!");
	};

	const agree = async () => {
		await axios.post(
			`http://localhost:9006/task/apply?tid=1&wtbh=${record.wtbh}&processId=${record.processId}&checkResult=同意`
		);
		setTableUpdate(!tableUpdate);
		setRecvUpdate(!recvUpdate);
		gMsg.onSuccess("已接收!");
	};

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = () => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => setAddModalOpen(true)}>
							查看文书
						</Button>

						<Space.Compact>
							<Popconfirm
								title="退回调查评估"
								description={
									<Input.TextArea
										placeholder="请输入原因"
										maxLength={100}
									/>
								}
								onConfirm={(e) => {
									back();
								}}
								icon={
									<QuestionCircleOutlined
										style={{ color: "red" }}
									/>
								}>
								<Button type="primary" danger>
									退回
								</Button>
							</Popconfirm>

							<Button
								type={"primary"}
								onClick={() => {
									agree();
								}}>
								接收
							</Button>
						</Space.Compact>
					</Space>
				);
			};
		}
	});

	return (
		<>
			<TaskInfoModal
				open={addModalOpen}
				setOpen={setAddModalOpen}
				info={record}
				taskUpdate={taskUpdate}
				gMsg={gMsg}
				recv={true}
			/>

			<TemplateModal
				title="调查评估代办列表"
				InfoDescriptions={
					<>
						<Button
							type="link"
							onClick={() => {
								setRecvUpdate(!recvUpdate);
								gMsg.onSuccess("刷新成功!");
							}}>
							刷新
						</Button>
						<Table
							columns={columns}
							dataSource={tableData}
							rowKey={(record) => record.id}
							onRow={(record) => {
								return {
									onClick: () => {
										setRecord(record);
									}, // 点击行
								};
							}}
						/>
					</>
				}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
}
