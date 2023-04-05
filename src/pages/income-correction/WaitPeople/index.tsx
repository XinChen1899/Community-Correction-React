import { Button, message, Popconfirm, Select, Space } from "antd";
import {
	CheckCircleOutlined,
	CloseCircleFilled,
	DeleteOutlined,
	EditOutlined,
	PlusCircleFilled,
	PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Spin } from "antd/lib";
import { SetStateAction, useState } from "react";
import TemplateHome from "@/pages/template/TemplateHome";
import RegisterModal from "./Modal/RegisterModal";
import { GMessage } from "@/coderepo/msg/GMsg";
import CrpInfoModal from "./Modal/CrpInfoModal";
import CrpModifyModal from "./Modal/CrpModifyModal";
import CrpRecModal from "./Modal/CrpRecModal";

export interface DataType {
	id: number;
	dxbh: string; // 对象编号
	name: string; // 矫正对象姓名
	sex: string; //性别
	sfdcpg: boolean; // 是否调查评估
	status: string; // 状态
}

const defaultDataType: DataType = {
	id: 0,
	dxbh: "",
	name: "",
	sex: "",
	sfdcpg: false,
	status: "",
};

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
		title: "矫正状态",
		dataIndex: "status",
		key: "status",
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function WaitPeople() {
	const [messageApi, contextHolder] = message.useMessage();

	const [registerModalOpen, setRegisterOpen] = useState(false);
	const [crpInfoModalOpen, setCrpInfoModalOpen] = useState(false);
	const [crpModifyModalOpen, setCrpModifyModalOpen] =
		useState(false);
	const [crpRecModalOpen, setCrpRecModalOpen] = useState(false);

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

	const gMsg: GMessage = {
		onSuccess: successMsg,
		onError: errorMsg,
	};

	// 绑定操作栏的操作
	columns.map((column) => {
		switch (column.key) {
			case "action": {
				column.render = (_, record) => {
					return (
						<Space size="middle" direction="horizontal">
							<Button
								type={"dashed"}
								onClick={() =>
									setCrpInfoModalOpen(true)
								}>
								矫正对象信息表
							</Button>
							<Button
								type={"dashed"}
								danger
								icon={<EditOutlined />}
								onClick={() =>
									setCrpModifyModalOpen(true)
								}>
								修改信息
							</Button>
							<Button
								type={"primary"}
								icon={<PlusCircleFilled />}
								onClick={() =>
									setCrpRecModalOpen(true)
								}>
								接收入矫
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
		}
	});

	const tableData: DataType[] = [
		{
			id: 1,
			dxbh: "111",
			name: "xxx",
			sex: "male",
			sfdcpg: true,
			status: "待入矫",
		},
	];

	return (
		<div>
			<CrpInfoModal
				open={crpInfoModalOpen}
				setOpen={setCrpInfoModalOpen}
				selectRecord={selectRecord}
			/>

			<RegisterModal
				open={registerModalOpen}
				setOpen={setRegisterOpen}
				gMsg={gMsg}
			/>
			<CrpModifyModal
				open={crpModifyModalOpen}
				setOpen={setCrpModifyModalOpen}
				selectRecord={selectRecord}
				gMsg={gMsg}
			/>
			<CrpRecModal
				open={crpRecModalOpen}
				setOpen={setCrpRecModalOpen}
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
									setRegisterOpen(true);
								}}
								type={"primary"}
								icon={<PlusOutlined />}>
								入矫登记
							</Button>
						</Space>
					</>
				}
				cardTitle={"待入矫人员统计"}
				statisticList={[
					{ title: "待矫正人员总数", value: 999 },
					{ title: "今日新增待矫正人员", value: 999 },
				]}
				tableData={tableData.length ? tableData : []}
				tableOnRow={(record: any) => {
					setSelectRecord(record);
					console.log(record);
				}}
			/>
		</div>
	);
}
