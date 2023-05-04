import {
	acceptDcpg,
	getAllDcpg,
	implSend2JZJG,
	implWTF,
	unacceptedDcpg,
} from "@/api/ie/impl";
import TemplateModal from "@/template/Modal";
import { getColumn } from "@/template/Table";
import { GMessage } from "@/utils/msg/GMsg";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { DataType } from "../..";
import TaskInfoModal from "../TaskInfoModal";

const columns: ColumnsType<DataType> = [
	getColumn("流程id", "processId"),
	getColumn("委托编号", "wtbh"),
	getColumn("操作", "action"),
];

export default function TaskRecvModal(props: {
	open: boolean;
	setOpen: any;
	tableUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
	openNotification: any;
}) {
	const {
		open,
		setOpen,
		tableUpdate,
		setTableUpdate,
		gMsg,
		openNotification,
	} = props;
	const [tableData, setTableData] = useState<DataType[]>();

	const [openInfo, setOpenInfo] = useState(false);

	const [record, setRecord] = useState<DataType>({
		wtbh: "",
	} as DataType);
	const [recvUpdate, setRecvUpdate] = useState(false);

	useRequest(getAllDcpg, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setTableData(data.data);
			}
		},
		refreshDeps: [recvUpdate],
		ready: open,
	});

	const { run: runUnaccepted } = useRequest(
		(info) => unacceptedDcpg(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					setRecvUpdate(!recvUpdate);
					gMsg.onSuccess("已退回!");
				} else {
					gMsg.onError(data.message);
				}
			},
			manual: true,
		}
	);

	const { run: runAccept } = useRequest(
		(info) => acceptDcpg(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					setRecvUpdate(!recvUpdate);
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("已接收!");
				} else {
					gMsg.onError(data.message);
				}
			},
			onFinally: () => {
				setOpen(false);
			},
			manual: true,
		}
	);

	const { run: runImplSend } = useRequest(implSend2JZJG, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setRecvUpdate(!recvUpdate);
				gMsg.onSuccess("已发送给社区矫正机构!");
				openNotification();
			} else {
				gMsg.onError(data.message);
			}
		},
		manual: true,
	});

	const { run: runStart } = useRequest(implWTF, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setRecvUpdate(!recvUpdate);
				gMsg.onSuccess("委托方正在准备材料!");
			} else {
				gMsg.onError(data.message);
			}
		},
		manual: true,
	});

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = () => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => setOpenInfo(true)}>
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
									if (record && record.wtbh != "")
										runUnaccepted(record);
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
									if (record && record.wtbh != "")
										runAccept(record);
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
				open={openInfo}
				setOpen={setOpenInfo}
				info={record}
				recv={true}
			/>

			<TemplateModal
				title="调查评估代办列表"
				InfoDescriptions={
					<>
						<Button
							type="link"
							onClick={() => {
								runStart();
							}}>
							模拟委托方开启调查评估流程
						</Button>
						<Button
							type="link"
							onClick={() => {
								runImplSend();
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
							rowKey={(record) => record.wtbh}
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
