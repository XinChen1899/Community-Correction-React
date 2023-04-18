import TemplateModal from "@/template/Modal";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import TaskInfoModal from "../TaskInfoModal";
import {
	implBack,
	implRecv,
	implSend2JZJG,
	implWTF,
} from "@/api/ie/impl";

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
	setTableUpdate: any;
	gMsg: GMessage;
}) {
	const {
		open,
		setOpen,
		tableUpdate,
		setTableUpdate,
		gMsg,
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
					"http://localhost:9006/ie/task/tasks?assignee=jzjg"
				)
				.then(({ data }) => data.data);
			setTableData(result);
		};

		fetchData();
	}, [recvUpdate]);

	const back = () => {
		implBack(record.processId, () => {
			setRecvUpdate(!recvUpdate);
			gMsg.onSuccess("已退回调查评估!");
		});
	};

	const agree = () => {
		implRecv(record.processId, () => {
			setTableUpdate(!tableUpdate);
			setRecvUpdate(!recvUpdate);
			gMsg.onSuccess("已接收!");
		});
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
								implWTF();
								gMsg.onSuccess(
									"开启一个调查评估流程!"
								);
							}}>
							模拟委托方开启调查评估流程
						</Button>
						<Button
							type="link"
							onClick={() => {
								implSend2JZJG(() => {
									setRecvUpdate(!recvUpdate);
									gMsg.onSuccess(
										"提交委托函，流程进入矫正机构!"
									);
								});
							}}>
							模拟委托方提交调查评估委托函
						</Button>
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
							rowKey={(record) => record.processId}
							onRow={(record) => {
								return {
									onClick: () => {
										setRecord(record);
									},
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
