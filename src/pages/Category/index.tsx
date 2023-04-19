import { getAllCate } from "@/api/cate";
import { CrpCategory } from "@/entity/Category/CategoryInfo";
import TemplateOperatorAndTable from "@/template/OperatorAndTable";
import TemplateTag, { TagType } from "@/template/Tag";
import { map2Value, nsyjzlbMap } from "@/utils";
import { useMessage } from "@/utils/msg/GMsg";
import { EditOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import InfoModal from "./Modal/InfoModal";
import ModifyModal from "./Modal/ModifyModal";

export type DataType = CrpCategory;

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
		title: "管理类别",
		dataIndex: "gllb",
		align: "center",
		render: (_, record) => (
			<TemplateTag
				value={map2Value(nsyjzlbMap, record.gllb)}
				type={TagType.Info}
			/>
		),
	},
	{
		title: "操作",
		key: "action",
	},
];

const staticTableData: DataType[] = [
	{ dxbh: "00000001", xm: "xxx", gllb: "yyy" },
];

export default function CategoryManagement() {
	const [record, setRecord] = useState<DataType>({
		dxbh: "",
	} as DataType);

	const [tableData, setTableData] =
		useState<DataType[]>(staticTableData);
	const [tableUpdate, setTableUpdate] = useState(false);

	const [infoModal, setInfoModal] = useState(false);
	const [modifyModal, setModifyModal] = useState(false);
	const [gMsg, contextHolder] = useMessage();

	columns.map((column) => {
		if (column.key == "action") {
			column.render = (_, record) => {
				return (
					<Space size="middle">
						<Button
							type={"dashed"}
							onClick={() => setInfoModal(true)}>
							查看管理类别
						</Button>
						<Button
							block
							type="link"
							icon={<EditOutlined />}
							onClick={() => setModifyModal(true)}>
							修改矫正类别审批
						</Button>
					</Space>
				);
			};
		}
	});

	useRequest(getAllCate, {
		onSuccess({ data }) {
			if (data.status == 200) {
				setTableData(data.data);
			}
		},
		onError(e) {
			gMsg.onError("请求不到调查评估的所有信息！" + e.message);
		},
		refreshDeps: [tableUpdate],
	});

	return (
		<>
			<InfoModal
				open={infoModal}
				setOpen={setInfoModal}
				info={record}
				gMsg={gMsg}
			/>
			<ModifyModal
				open={modifyModal}
				setOpen={setModifyModal}
				info={record}
				gMsg={gMsg}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
			/>
			{contextHolder}
			<TemplateOperatorAndTable
				columns={columns}
				cardExtra={undefined}
				cardTitle={"分类管理"}
				statisticList={[
					{ title: "基础级人员总数", value: 999 },
					{ title: "宽松级人员总数", value: 999 },
					{ title: "普通级人员总数", value: 999 },
					{ title: "严格级人员总数", value: 999 },
				]}
				tableOnRow={(record: DataType) => setRecord(record)}
				tableData={tableData}
				tableRowKey={(rec: DataType) => rec.dxbh}
			/>
		</>
	);
}
