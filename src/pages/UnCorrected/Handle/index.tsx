import { getAllUncorrected, implUncorrSFS } from "@/api/uncorrected";
import { UnCorrectdInfo } from "@/entity/Uncorrected/UnCorrectedInfo";
import { useMyNotification } from "@/template/Notification";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { map2Value, zzjzlxMap } from "@/utils";
import { getDate } from "@/utils/ie";
import { useMessage } from "@/utils/msg/GMsg";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import ProcessModal from "../Modal/ProcessModal";

// 解除矫正办理信息

export type DataType = UnCorrectdInfo;

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
		align: "center",
		width: 150,
	},
	{
		title: "矫正对象姓名",
		dataIndex: "xm",
		align: "center",
		key: "xm",
	},
	{
		title: "解除矫正类型",
		dataIndex: "jcjzlx",
		key: "jcjzlx",
		align: "center",
		render: (_, record) => (
			<TemplateTag
				value={map2Value(zzjzlxMap, record.jcjzlx)}
				type={MyTagType.Info}
			/>
		),
	},
	{
		title: "解除矫正日期",
		dataIndex: "jcjzrq",
		key: "jcjzrq",
		align: "center",
		render: (_, record) => (
			<TemplateTag
				value={getDate(record.jcjzrq)}
				type={MyTagType.Info}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

export default function UncorrectedHandle() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);
	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [tableUpdate, setTableUpdate] = useState(false);

	const [openInfo, setInfoModal] = useState(false);
	const [openModify, setModifyModal] = useState(false);
	const [openProcess, setOpenProcess] = useState(false);

	const [gMsg, contextHolder] = useMessage();

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					onClick={() => setModifyModal(true)}>
					占位
				</Button>
			),
			key: "0",
		},
	];
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type="primary"
							onClick={() => setOpenProcess(true)}>
							审批
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

	const [notifyContext, openNotification] = useMyNotification(
		"解除矫正待办",
		"您有一条「解除矫正」待办信息，请及时处理"
	);

	useRequest(getAllUncorrected, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setTableData(data.data);
			}
		},
		refreshDeps: [tableUpdate],
	});

	const { run: implSfs } = useRequest(implUncorrSFS, {
		manual: true,
		onSuccess: ({ data }) => {
			if (data.status == 200 && data.data == true) {
				openNotification();
				setTableUpdate(!tableUpdate);
			}
		},
	});

	return (
		<>
			<ProcessModal
				open={openProcess}
				setOpen={setOpenProcess}
				info={record}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
			/>
			{contextHolder}
			{notifyContext}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={
					<Space>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => {
								implSfs();
							}}>
							接收解除矫正请求
						</Button>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => setModifyModal(true)}>
							添加解除矫正
						</Button>
					</Space>
				}
				cardTitle={"解除矫正"}
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
				tableOnRow={(rec: DataType) => setRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
