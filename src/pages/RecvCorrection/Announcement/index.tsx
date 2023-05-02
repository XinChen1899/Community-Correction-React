import { finishAnnounce, getAllAnnounces } from "@/api/ic/announce";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { getColumn } from "@/template/Table";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { getDate } from "@/utils/ie";
import { useMessage } from "@/utils/msg/GMsg";
import {
	CheckCircleTwoTone,
	DownOutlined,
	EditTwoTone,
	PlusOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import InfoModal from "./Modal/InfoModal";
import ModifyModal from "./Modal/ModifyModal";
import RegisterModal from "./Modal/RegisterModal";

export type DataType = CrpAnnouncement;

const columns: ColumnsType<DataType> = [
	getColumn("对象编号", "dxbh"),
	getColumn("对象姓名", "xm"),
	getColumn("宣告日期", "xgrq", (_, record) => (
		<TemplateTag
			value={getDate(record.xgrq)}
			type={MyTagType.Info}
		/>
	)),
	getColumn("是否宣告", "finish", (_, record) => (
		<TemplateTag
			value={record.finish ? "已完成" : "未完成"}
			type={
				record.finish ? MyTagType.Accept : MyTagType.Warning
			}
		/>
	)),
	getColumn("操作", "action"),
];

//! 入矫宣告
export default function Announcement() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

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
		{
			label: (
				<Button
					block
					type="text"
					icon={<CheckCircleTwoTone />}
					onClick={() => runFinishAnnounce(selectRecord)}>
					已宣告
				</Button>
			),
			key: "2",
		},
		{ type: "divider" },
	];
	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type="link"
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

	const [openRegister, setOpenRegister] = useState(false);
	const [openInfo, setOpenInfo] = useState(false);
	const [openModify, setOpenModify] = useState(false);

	useRequest(getAllAnnounces, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setTableData(data.data);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		refreshDeps: [tableUpdate],
	});

	const { run: runFinishAnnounce } = useRequest(
		(record) => finishAnnounce(record),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					gMsg.onSuccess("已完成入矫宣告");
				} else {
					gMsg.onError("请稍后再试");
				}
			},
			debounceWait: 150,
			manual: true,
			ready:
				selectRecord != undefined && selectRecord.dxbh != "",
		}
	);

	return (
		<>
			<ModifyModal
				open={openModify}
				setOpen={setOpenModify}
				info={selectRecord}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
			/>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
			/>
			<RegisterModal
				open={openRegister}
				setOpen={setOpenRegister}
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
							onClick={() => setOpenRegister(true)}>
							添加入矫宣告
						</Button>
					</>
				}
				cardTitle={"入矫宣告信息"}
				statisticList={[
					{ title: "入矫宣告总数", value: 999 },
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
