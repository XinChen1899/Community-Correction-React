import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { GMessage } from "@/utils/msg/GMsg";
import {
	EditOutlined,
	DeleteOutlined,
	DownOutlined,
	PlusCircleFilled,
	PlusOutlined,
	CheckCircleFilled,
	CheckCircleTwoTone,
	LoadingOutlined,
} from "@ant-design/icons";
import {
	Button,
	Dropdown,
	MenuProps,
	Popconfirm,
	Space,
	message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import RegisterModal from "./Modal/RegisterModal";
import InfoModal from "./Modal/InfoModal";
export interface DataType {
	id: string;
	dxbh: string; //对象编号
	xm: string; // 宣告人
	xgrq: string; // 宣告日期
	finish: boolean; // 是否宣告
}

const defaultDataType: DataType = {
	id: "1",
	dxbh: "12",
	xm: "2112",
	xgrq: "21121",
	finish: false,
};

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
	},
	{
		title: "对象姓名",
		dataIndex: "xm",
		key: "xm",
	},
	{
		title: "宣告日期",
		dataIndex: "xgrq",
		key: "xgrq",
	},
	{
		title: "是否宣告",
		dataIndex: "finish",
		key: "finish",
		render: (_, record) => {
			const { finish } = record;
			if (finish) return <CheckCircleFilled />;
			else return <LoadingOutlined />;
		},
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{ id: "1", dxbh: "12", xm: "2112", xgrq: "21121", finish: false },
	{
		id: "2",
		dxbh: "122",
		xm: "21212",
		xgrq: "211221",
		finish: false,
	},
];

// 入矫宣告
export default function Announcement() {
	const [messageApi, contextHolder] = message.useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>();

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
	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditOutlined />}
					onClick={() => {}}>
					修改宣告书
				</Button>
			),
			key: "0",
		},
		{ type: "divider" },
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
			key: "0",
		},
	];
	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => setOpenInfo(true)}>
							查看宣告书
						</Button>
						<Dropdown
							menu={{ items }}
							trigger={["click"]}>
							<a onClick={(e) => e.preventDefault()}>
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
	});

	const gMsg: GMessage = {
		onSuccess: successMsg,
		onError: errorMsg,
	};

	const [openRegister, setOpenRegister] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);

	return (
		<>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				dxbh={selectRecord.dxbh}
				gMsg={gMsg}
			/>
			<RegisterModal
				open={openRegister}
				setOpen={setOpenRegister}
				dxbh={selectRecord.dxbh}
				gMsg={gMsg}
				tableUpdate={false}
				setTableUpdate={undefined}
				infoUpdate={false}
				setInfoUpdate={undefined}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={
					<>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => setOpenRegister(true)}>
							添加入矫宣告
						</Button>
					</>
				}
				cardTitle={"入矫宣告信息"}
				statisticList={[
					{ title: "入矫宣告总数", value: 999 },
				]}
				tableOnRow={(rec: any) => setSelectRecord(rec)}
				tableData={staticTableData}
			/>
		</>
	);
}