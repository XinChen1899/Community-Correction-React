import { getAllVisitor } from "@/api/business/visitor";
import { VisitorInfo } from "@/entity/Business/Visitor/VisitorInfo";
import { useMyNotification } from "@/template/Notification";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { getColumn } from "@/template/Table";
import TemplateTag, { MyTagType } from "@/template/Tag";
import { map2Value, spjgMap } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import { PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import AddModal from "./Modal/AddModal";
import ProcessModal from "./Modal/ProcessModal";

export type DataType = VisitorInfo;

const columns: ColumnsType<DataType> = [
	getColumn("申请对象编号", "dxbh"),
	getColumn("申请对象姓名", "xm"),
	getColumn("会见人姓名", "hjrxm", (_, rec) => (
		<TemplateTag value={rec.hjrxm} type={MyTagType.Info} />
	)),
	getColumn("审批结果", "spjg", (_, rec) => (
		<TemplateTag
			value={map2Value(spjgMap, rec.spjg)}
			type={
				rec.spjg == "01" ? MyTagType.Accept : MyTagType.Error
			}
		/>
	)),
	getColumn("操作", "action"),
];
export default function VisitorApproval() {
	const [gMsg, contextHolder] = useMessage();

	const [tableUpdate, setTableUpdate] = useState(false);

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [selectRecord, setSelectRecord] = useState<DataType>(
		{} as DataType
	);

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = () => {
				return (
					<Space>
						<Button
							type="link"
							onClick={() => setOpenAdd(true)}>
							修改/查看《信息表》
						</Button>
						<Button
							type="link"
							onClick={() => setOpenProcess(true)}>
							审批
						</Button>
					</Space>
				);
			};
		}
	});

	const [openAdd, setOpenAdd] = useState(false);
	const [openProcess, setOpenProcess] = useState(false);

	useRequest(getAllVisitor, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				console.log("anc");
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
	const [notifyContext, openNotification] = useMyNotification(
		"会客审批待办",
		"会客审批待办！请及时处理"
	);
	return (
		<>
			{notifyContext}
			<ProcessModal
				open={openProcess}
				setOpen={setOpenProcess}
				info={selectRecord}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				gMsg={gMsg}
				setNotify={openNotification}
			/>
			<AddModal
				open={openAdd}
				setOpen={setOpenAdd}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				info={selectRecord}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => {
							setSelectRecord({} as DataType);
							setOpenAdd(true);
						}}>
						添加会客审批
					</Button>
				}
				cardTitle={"会客审批"}
				statisticList={[{ title: "今日审批数", value: 999 }]}
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
					{
						placeholder: "请输入审批结果",
						onSearch: (value: string) => {
							if (value == "") {
								setTableData(history);
								return;
							}
							const filterData = tableData.filter(
								(item) => item.spjg.includes(value)
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
