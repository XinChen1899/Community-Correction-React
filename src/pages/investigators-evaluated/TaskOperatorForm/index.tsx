import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Col,
	Descriptions,
	Row,
	Statistic,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import TaskAddModal from "@/pages/investigators-evaluated/Modal/TaskAddModal";
import { IEData } from "@/entity/IE/IEData";
import axios from "axios";
import { GMessage } from "@/coderepo/msg/GMsg";

/*
 * 调查评估任务表的操作表单
 * - 新增调查评估
 * */

export default function TaskOperatorForm(props: {
	tableUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
}) {
	const { tableUpdate, setTableUpdate, gMsg } = props;

	const [addModalOpen, setAddModalOpen] = useState(false);
	const [infoCount, setInfoCount] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				`http://localhost:9006/ie/count`
			);
			setInfoCount(result.data);
		};
		fetchData();
	}, [tableUpdate]);

	const ieData: IEData = {
		currentProcessNumber: 0,
		todayCompleteNumber: 0,
		todayNewNumber: 0,
		totalNumber: infoCount,
	};

	return (
		<>
			<TaskAddModal
				open={addModalOpen}
				setOpen={setAddModalOpen}
				tableUpdate={tableUpdate}
				setTableUpdate={setTableUpdate}
				tableCount={infoCount}
				gMsg={gMsg}
			/>
			<Card
				title={"调查评估操作区"}
				extra={
					<>
						<Button
							onClick={() => setAddModalOpen(true)}
							type={"primary"}
							icon={<PlusOutlined />}>
							新增调查评估
						</Button>
					</>
				}>
				{/* todo 调查评估统计数据！*/}
				<Row gutter={16}>
					<Col span={12}>
						<Statistic title="调查评估总数" value={999} />
					</Col>
					<Col span={12}>
						<Statistic
							title="今日新增调查评估数"
							value={999}
						/>
					</Col>
					<Col span={12}>
						<Statistic
							title="正在处理中的调查评估数"
							value={999}
						/>
					</Col>
				</Row>
				<Descriptions></Descriptions>
			</Card>
		</>
	);
}
