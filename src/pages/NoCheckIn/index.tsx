import { getAllNoCheck } from "@/api/ic/nocheck";
import { CrpCheck } from "@/entity/IC/CrpCheck";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import InfoModal from "./Modal";

export type DataType = CrpCheck;

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
		title: "应报到日期",
		dataIndex: "date",
		align: "center",
		key: "date",
	},
	{
		title: "操作",
		key: "action",
	},
];

//! 逾期报到/未报到
export default function NoCheckIn() {
	const [gMsg, contextHolder] = useMessage();

	const [tableData, setTableData] = useState<DataType[]>([]);
	const [history, setHistory] = useState<DataType[]>([]);

	const [selectRecord, setSelectRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Button
						type="link"
						onClick={() => setOpenInfo(true)}>
						查看详细情况
					</Button>
				);
			};
		}
	});

	const [openInfo, setOpenInfo] = useState(false);
	useRequest(getAllNoCheck, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setTableData(data.data);
			}
		},
		onError: (error: any) => {
			gMsg.onError(error);
		},
		// refreshDeps: [tableUpdate],
	});

	return (
		<>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
				gMsg={gMsg}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={<></>}
				cardTitle={"矫正人员报到情况"}
				statisticList={[
					{ title: "矫正人员未报到总数", value: 999 },
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
