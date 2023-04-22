import {
	finishAnnouncement,
	getAllAnnouncement,
} from "@/api/uncorrected/announcement";
import { UnCorrectedAnnouncement } from "@/entity/Uncorrected/UnCorrectedAnnouncement";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { getDate } from "@/utils/ie";
import { useMessage } from "@/utils/msg/GMsg";
import {
	CheckCircleTwoTone,
	DownOutlined,
	EditTwoTone,
	LoadingOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddAnnouncementModal from "../Modal/AddAnnounceInfo";
import AnnounceInfoModal from "../Modal/AnnounceInfo";
import ModifyAnnouncementModal from "../Modal/ModifyModal";

export type DataType = UnCorrectedAnnouncement;

const columns: ColumnsType<DataType> = [
	{
		title: "对象编号",
		dataIndex: "dxbh",
		key: "dxbh",
		align: "center",
	},
	{
		title: "对象姓名",
		dataIndex: "xm",
		align: "center",
		key: "xm",
	},
	{
		title: "宣告日期",
		dataIndex: "xgrq",
		align: "center",
		key: "xgrq",
		render: (_, record) => (
			<TemplateTag
				value={getDate(record.xgrq)}
				type={MyTagType.Info}
			/>
		),
	},
	{
		title: "是否宣告",
		dataIndex: "finish",
		align: "center",
		key: "finish",
		render: (_, record) => {
			const { finish } = record;
			if (finish == "01") return <CheckCircleTwoTone />;
			else return <LoadingOutlined />;
		},
	},
	{
		title: "操作",
		key: "action",
	},
];

// 入矫宣告
export default function UncorrectedAnnouncement() {
	const [gMsg, contextHolder] = useMessage();
	const [history, setHistory] = useState<DataType[]>([]);

	const [tableUpdate, setTableUpdate] = useState(false);
	const [tableData, setTableData] = useState<DataType[]>([]);
	const [selectRecord, setSelectRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const items: MenuProps["items"] = [
		{
			label: (
				<Button
					block
					type="text"
					icon={<EditTwoTone />}
					onClick={() => setOpenModify(true)}>
					修改宣告书
				</Button>
			),
			key: "0",
		},
		{ type: "divider" },
		{
			label: (
				<Button
					block
					type="text"
					icon={<CheckCircleTwoTone />}
					onClick={() => {
						runFinish(selectRecord);
					}}>
					已宣告！
				</Button>
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

	const [openAdd, setOpenAdd] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	useRequest(getAllAnnouncement, {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setTableData(data.data);
			}
		},
		refreshDeps: [tableUpdate],
	});

	const { run: runFinish } = useRequest(
		(record) => finishAnnouncement(record),
		{
			onSuccess: ({ data }) => {
				if (data.status == 200) {
					gMsg.onSuccess("宣告已完成!");
					setTableUpdate(!tableUpdate);
				}
			},
			manual: true,
		}
	);

	return (
		<>
			<ModifyAnnouncementModal
				open={openModify}
				setOpen={setOpenModify}
				info={selectRecord}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			<AnnounceInfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
			/>
			<AddAnnouncementModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={
					<>
						<Button
							type="primary"
							icon={<PlusOutlined />}
							onClick={() => setOpenAdd(true)}>
							添加解矫宣告
						</Button>
					</>
				}
				cardTitle={"解矫宣告信息"}
				statisticList={[
					{ title: "解矫宣告总数", value: 999 },
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
				tableOnRow={(rec: DataType) => setSelectRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
