import { getAllCrp } from "@/api/ic";
import { CorrectionPeople } from "@/entity/IC/Crp";
import TemplateHome from "@/template/OperatorAndTable";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { useMessage } from "@/utils/msg/GMsg";
import {
	CheckCircleFilled,
	CheckCircleOutlined,
	CloseCircleFilled,
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Popconfirm, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { Spin } from "antd/lib";
import { useState } from "react";
import CrpInfoModal from "./Modal/CrpInfoModal";
import CrpModifyModal from "./Modal/CrpModifyModal";
import CrpRecModal from "./Modal/CrpRecModal";
import RegisterModal from "./Modal/RegisterModal";

export type DataType = CorrectionPeople;

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		align: "center",
		key: "dxbh",
		width: 150,
	},
	{
		title: "姓名",
		dataIndex: "xm",
		align: "center",
		key: "xm",
	},
	{
		title: "是否调查评估",
		dataIndex: "sfdcpg",
		key: "sfdcpg",
		align: "center",
		render: (value) => {
			let loading;
			if (value == "0")
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
		align: "center",
		dataIndex: "status",
		key: "status",
		render: (value) => (
			<TemplateTag value={value} type={MyTagType.Accept} />
		),
	},
	{
		title: "矫正小组",
		dataIndex: "team",
		align: "center",
		key: "team",
		render: (value) => (
			<TemplateTag
				value={`小组${value}`}
				type={MyTagType.Info}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

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

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [tableUpdate, setTableUpdate] = useState(false);

	useRequest(getAllCrp, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setTableData(data.data);
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
					icon={<EditOutlined />}
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
					icon={<CheckCircleFilled />}
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
								type={"dashed"}
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
					<>
						<Space direction={"horizontal"}>
							<Button
								onClick={() => {
									setOpenRegister(true);
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
				tableData={tableData ? tableData : []}
				tableOnRow={(record: any) => {
					setSelectRecord(record);
				}}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</div>
	);
}
