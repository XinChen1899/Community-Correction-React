import { getAllCrp, getCount } from "@/api/ic";
import { CorrectionPeople } from "@/entity/IC/Crp";
import TemplateHome from "@/template/OperatorAndTable";
import { getColumn } from "@/template/Table";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { useMessage } from "@/utils/msg/GMsg";
import {
	CheckCircleOutlined,
	CheckCircleTwoTone,
	CloseCircleFilled,
	DeleteOutlined,
	DownOutlined,
	EditTwoTone,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
	Avatar,
	Button,
	Dropdown,
	MenuProps,
	Popconfirm,
	Space,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Spin } from "antd/lib";
import { useState } from "react";
import CrpInfoModal from "./Modal/CrpInfoModal";
import CrpModifyModal from "./Modal/CrpModifyModal";
import CrpRecModal from "./Modal/CrpRecModal";
import RegisterModal from "./Modal/RegisterModal";

export type DataType = CorrectionPeople;

const columns: ColumnsType<DataType> = [
	getColumn("对象编号", "dxbh"),
	getColumn("对象照片", "zp", (_, record) => (
		<Avatar size={"large"} shape="square" src={record.zp} />
	)),
	getColumn("姓名", "xm"),
	getColumn("是否调查评估", "sfdcpg", (_, record) => {
		let loading;
		if (record.sfdcpg == "1")
			loading = <Spin indicator={<CheckCircleOutlined />} />;
		else loading = <Spin indicator={<CloseCircleFilled />} />;
		return loading;
	}),
	getColumn("矫正状态", "status", (_, record) => (
		<TemplateTag
			value={record.status}
			type={
				record.status == "在矫"
					? MyTagType.Accept
					: MyTagType.Warning
			}
		/>
	)),
	getColumn("矫正小组", "team", (_, record) => {
		const value = record.team;
		if (value != null)
			return (
				<TemplateTag
					value={`小组${value}`}
					type={MyTagType.Info}
				/>
			);
		else
			return (
				<TemplateTag
					value={`无小组`}
					type={MyTagType.Warning}
				/>
			);
	}),
	getColumn("操作", "action"),
];

interface NumberData {
	total: number;
	unreceived: number;
	received: number;
}

//! 待入矫人员
export default function WaitPeople() {
	const [gMsg, contextHolder] = useMessage();

	const [openRegister, setOpenRegister] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModift] = useState(false);
	const [openRecv, setOpenRecv] = useState(false);

	const [selectRecord, setSelectRecord] = useState<DataType>(
		{} as DataType
	);

	const [numberData, setNumberData] = useState<NumberData>(
		{} as NumberData
	);
	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [tableUpdate, setTableUpdate] = useState(false);

	useRequest(getAllCrp, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setTableData(data.data);
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	useRequest(getCount, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setNumberData(data.data);
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditTwoTone />}
					onClick={() => setOpenModift(true)}>
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
					icon={<CheckCircleTwoTone />}
					onClick={() => setOpenRecv(true)}>
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
								type="link"
								onClick={() => setOpenInfo(true)}>
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
				open={openInfo}
				setOpen={setOpenInfo}
				selectRecord={selectRecord}
			/>

			<RegisterModal
				open={openRegister}
				setOpen={setOpenRegister}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<CrpModifyModal
				open={openModify}
				setOpen={setOpenModift}
				selectRecord={selectRecord}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<CrpRecModal
				open={openRecv}
				setOpen={setOpenRecv}
				selectRecord={selectRecord}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			{contextHolder}
			<TemplateHome
				columns={columns}
				cardExtra={
					<Button
						onClick={() => setOpenRegister(true)}
						type={"primary"}
						icon={<PlusOutlined />}>
						入矫登记
					</Button>
				}
				cardTitle={"待入矫人员统计"}
				statisticList={[
					{
						title: "矫正人员总数",
						value: numberData.total,
					},
					{
						title: "待入矫人数",
						value: numberData.unreceived,
					},
					{
						title: "已入矫人数",
						value: numberData.received,
					},
				]}
				searchList={[
					{
						placeholder: "请输入对象编号",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.dxbh.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
					{
						placeholder: "请输入对象姓名",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.xm.includes(value)
							);
							setTableData((prev) => {
								setHistory(prev);
								return filterData;
							});
						},
					},
				]}
				tableData={tableData}
				tableOnRow={(record: DataType) =>
					setSelectRecord(record)
				}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</div>
	);
}
