import { GMessage } from "@/coderepo/msg/GMsg";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import {
	EditOutlined,
	DownOutlined,
	AppstoreAddOutlined,
	InfoCircleFilled,
} from "@ant-design/icons";
import {
	Button,
	Dropdown,
	MenuProps,
	Space,
	Tag,
	message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

export interface DataType {
	id: number;
	wtbh: string; // 委托编号
	name: string; // 矫正对象姓名
	bb: boolean; // 报备
	bk: boolean; // 边控
}

const columns: ColumnsType<DataType> = [
	{
		title: "委托编号",
		dataIndex: "wtbh",
		key: "wtbh",
		width: 150,
	},
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "报备",
		dataIndex: "bb",
		key: "bb",
		align: "center",
		render: (_, record) => (
			<Tag>{record.bb ? "已备案" : "待备案"}</Tag>
		),
		width: 120,
	},
	{
		title: "边控",
		dataIndex: "bk",
		key: "bk",
		align: "center",
		render: (_, record) => (
			<Tag>{record.bk ? "已边控" : "待边控"}</Tag>
		),
		width: 120,
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{
		id: 1,
		wtbh: "111",
		name: "xxx",
		bb: false,
		bk: true,
	},
	{
		id: 2,
		wtbh: "222",
		name: "yyy",
		bb: true,
		bk: false,
	},
];

/**
 * todoList
 * 1. 调查评估接收后，不准出境列表自动更新
 * 2. 可以报备、证照代管、边控
 * 3. 查看出入境情况
 */

export default function NoExit() {
	const [record, setRecord] = useState<DataType>();

	const [messageApi, contextHolder] = message.useMessage();

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
					onClick={() => {
						gMsg.onSuccess("报备");
					}}>
					报备
				</Button>
			),
			key: "0",
		},
		{
			label: (
				<Button
					block
					type="text"
					icon={<AppstoreAddOutlined />}
					onClick={() => {
						gMsg.onSuccess("证照代管");
					}}>
					证照代管
				</Button>
			),
			key: "01",
		},
		{
			type: "divider",
		},
		{
			label: (
				<Button
					block
					type={"text"}
					onClick={() => {
						gMsg.onSuccess("边控");
					}}
					icon={<InfoCircleFilled />}>
					边控
				</Button>
			),
			key: "23",
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
							onClick={() => {
								gMsg.onSuccess("查看出入境情况");
							}}>
							出入境情况
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

	return (
		<>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={undefined}
				cardTitle={"出境管理"}
				statisticList={[
					{ title: "矫正人员总数", value: 999 },
					{ title: "今日新增待备案人数", value: 999 },
				]}
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={staticTableData}
			/>
		</>
	);
}
