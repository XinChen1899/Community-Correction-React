import {
	Button,
	Dropdown,
	MenuProps,
	message,
	Popconfirm,
	Space,
	Tag,
} from "antd";
import {
	CheckCircleFilled,
	CheckCircleOutlined,
	CloseCircleFilled,
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	PlusCircleFilled,
	PlusOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Spin } from "antd/lib";
import { useEffect, useState } from "react";
import TemplateHome from "@/template/OperatorAndTable";
import RegisterModal from "./Modal/RegisterModal";
import { GMessage } from "@/utils/msg/GMsg";
import CrpInfoModal from "./Modal/CrpInfoModal";
import CrpModifyModal from "./Modal/CrpModifyModal";
import CrpRecModal from "./Modal/CrpRecModal";
import { getAllCrp } from "@/api/ic";
import { CorrectionPeople } from "@/entity/IC/Crp";

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
		render: (value) => {
			let v = "男";
			if (value == "female") v = "女";
			return <Tag>{v}</Tag>;
		},
	},
	{
		title: "是否调查评估",
		dataIndex: "sfdcpg",
		key: "sfdcpg",
		align: "center",
		render: (value) => {
			let loading;
			if (value == "否")
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
		render: (value) => {
			let color = "blue";
			switch (value) {
				case "待入矫":
					color = "magenta";
					break;
				case "在矫":
					color = "#87d068";
					break;
			}
			return <Tag color={color}>{value}</Tag>;
		},
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

	const [tableData, setTableData] = useState<DataType[]>();

	const [tableUpdate, setTableUpdate] = useState(false);
	const [infoUpdate, setInfoUpdate] = useState(false);

	useEffect(() => {
		const crp2DataType = (crpList: CorrectionPeople[]) => {
			return crpList.map((crp, idx: number) => {
				return {
					id: idx,
					dxbh: crp.sqjzdxbh,
					name: crp.xm,
					sex: crp.xb,
					sfdcpg: crp.sfdcpg,
					status: idx % 2 == 0 ? "在矫" : "等待入矫",
				} as DataType;
			});
		};
		getAllCrp(
			(crpList: CorrectionPeople[]) => {
				const td = crp2DataType(crpList);
				setTableData(td);
			},
			() => gMsg.onError("请求不到矫正人员的信息！")
		);
	}, [tableUpdate]);

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
	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => setCrpModifyModalOpen(true)}>
					修改信息
				</Button>
			),
			key: "0",
		},
		{
			label: (
				<Button
					block
					type="text"
					icon={<CheckCircleFilled />}
					onClick={() => setCrpRecModalOpen(true)}>
					接收入矫
				</Button>
			),
			key: "1",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Popconfirm
					title="是否删除"
					description="是否删除该调查评估信息！"
					onOpenChange={() => console.log("open change")}>
					<Button
						type={"primary"}
						danger
						block
						icon={<DeleteOutlined />}>
						删除!
					</Button>
				</Popconfirm>
			),
			key: "2",
		},
	];

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
							<Dropdown
								menu={{ items }}
								trigger={["click"]}>
								<a
									onClick={(e) =>
										e.preventDefault()
									}>
									<Space>
										操作
										<DownOutlined />
									</Space>
								</a>
							</Dropdown>
						</Space>
					);
				};
			}
		}
	});

	return (
		<div>
			<CrpInfoModal
				open={crpInfoModalOpen}
				setOpen={setCrpInfoModalOpen}
				selectRecord={selectRecord}
				gMsg={gMsg}
				infoUpdate={infoUpdate}
			/>

			<RegisterModal
				open={registerModalOpen}
				setOpen={setRegisterOpen}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				infoUpdate={infoUpdate}
				setInfoUpdate={setInfoUpdate}
			/>
			<CrpModifyModal
				open={crpModifyModalOpen}
				setOpen={setCrpModifyModalOpen}
				selectRecord={selectRecord}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				infoUpdate={infoUpdate}
				setInfoUpdate={setInfoUpdate}
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
				tableData={tableData ? tableData : []}
				tableOnRow={(record: any) => {
					setSelectRecord(record);
					console.log(record);
				}}
			/>
		</div>
	);
}
