import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import { useMessage } from "@/utils/msg/GMsg";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import InfoModal from "./Modal/InfoModal";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import { CrpCheck } from "@/entity/IC/CrpCheck";
import { getAllNoCheck } from "@/api/ic/nocheck";

export type DataType = CrpCheck;

const defaultDataType: DataType = {
	dxbh: "12",
	xm: "2112",
	date: "xxxx",
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
		title: "应报到日期",
		dataIndex: "date",
		key: "date",
	},
	{
		title: "操作",
		key: "action",
	},
];

// 逾期报到/未报到
export default function NoCheckIn() {
	const [gMsg, contextHolder] = useMessage();

	const [tableData, setTableData] = useState<DataType[]>([
		defaultDataType,
	]);
	const [selectRecord, setSelectRecord] =
		useState<DataType>(defaultDataType);

	// 绑定操作栏的操作
	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Button
						type={"dashed"}
						onClick={() => setOpenInfo(true)}>
						查看详细情况
					</Button>
				);
			};
		}
	});

	const [openInfo, setOpenInfo] = useState(false);

	useEffect(() => {
		getAllNoCheck(
			(list: CrpCheck[]) => {
				setTableData(list);
			},
			(msg: string) => {
				gMsg.onError("请求不到未报到情况的所有信息！" + msg);
			}
		);
	}, []);

	return (
		<>
			<InfoModal
				open={openInfo}
				setOpen={setOpenInfo}
				info={selectRecord}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={<></>}
				cardTitle={"矫正人员报到情况"}
				statisticList={[
					{ title: "矫正人员未报到总数", value: 999 },
				]}
				tableOnRow={(rec: any) => setSelectRecord(rec)}
				tableData={tableData}
				tableRowKey={(rec: CrpAnnouncement) => rec.dxbh}
			/>
		</>
	);
}
