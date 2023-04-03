import {
	Button,
	Card,
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	Upload
} from "antd";
import React, { useEffect, useState } from "react";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import { IEInfo } from "@/entity/IE/IEInfo";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";
import { Space } from "antd/lib";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { IEInfo2 } from "@/entity/IE/IEInfo2";
import dayjs from "dayjs";
import { updateIEInfoData, updateIEVisInfoData } from "@/api/ie";
import { IEVisitInfo2 } from "@/entity/IE/IEVisitInfo2";
import { getDate, IeFormConvert2IeInfo } from "@/coderepo/ie";
import {
	IEInfoForm
} from "@/pages/investigators-evaluated/Form/IEInfoForm";
import {
	IeVisitForm
} from "@/pages/investigators-evaluated/Form/IEVisitForm";

const { TextArea } = Input;

interface ITaskInfoModal {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	selectTask: DataType;
	tableUpdate: any;
	setTableUpdate: any;
	taskUpdate: any;
	setTaskUpdate: any;
}

export default function TaskModifyModal(props: ITaskInfoModal) {
	const {
		open,
		setOpen,
		selectTask,
		setTableUpdate,
		tableUpdate,
		taskUpdate,
		setTaskUpdate
	} = props;

	const { wtbh } = selectTask;

	const tempIeInfo: IEInfo2 = {
		bdcpgrdlx: "",
		bgrcsrq: dayjs(),
		bgrgzdw: "",
		bgrjzddz: "",
		bgrsfzh: "",
		bgrxb: "",
		dcdwxqj: "",
		dcpgyj: "",
		dcpgyjs: "",
		dcyjshr: "",
		fjx: "",
		nsyjzlb: "",
		pjjg: "",
		pjrq: dayjs(),
		wtdch: "",
		wtdw: "",
		ypxf: "",
		ypxq: "",
		ypxqjsrq: dayjs(),
		ypxqksrq: dayjs(),
		zm: "",
		wtbh: selectTask.wtbh,
		bgrxm: selectTask.name
	};
	const tempIeVisInfo: IEVisitInfo2 = {
		bdcrxm: "",
		dcdd: "",
		dcdwsfs: "",
		dcr: "",
		dcsj: dayjs(),
		dcsx: "",
		wtbh: "",
		ybgrgx: ""
	};


	const [ieInfo, setIeInfo] = useState<IEInfo2>(tempIeInfo);
	const [ieVisInfo, setIEVisInfo] = useState<IEVisitInfo2>(tempIeVisInfo);

	const [confirmLoading, setConfirmLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`http://localhost:9006/ie/${wtbh}`);
			const temp: IEInfo = result.data;
			const data: IEInfo2 = result.data;
			data.bgrcsrq = dayjs(temp.bgrcsrq);
			data.ypxqjsrq = dayjs(temp.ypxqjsrq);
			data.ypxqksrq = dayjs(temp.ypxqksrq);
			data.pjrq = dayjs(temp.pjrq);
			setIeInfo(data);
		};
		fetchData();

		const fetchData2 = async () => {
			const result = await axios.get(`http://localhost:9006/ie/vis/${wtbh}`);
			const temp: IEVisitInfo = result.data;
			const data: IEVisitInfo2 = result.data;
			data.dcsj = dayjs(temp.dcsj);
			setIEVisInfo(data);
		};
		fetchData2();
	}, [wtbh, taskUpdate]);

	const [form] = Form.useForm();
	const [form2] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(ieInfo);
		form2.resetFields();
		form2.setFieldsValue(ieVisInfo);
	});

	const onFinish = async (values: any) => {
		const info = IeFormConvert2IeInfo(values);

		await updateIEInfoData(info);
		setTableUpdate(!tableUpdate);
		setTaskUpdate(!taskUpdate);
	};

	const onFinish2 = async (values: any) => {
		const info = values as IEVisitInfo;
		info.wtbh = selectTask.wtbh;
		info.dcsj = getDate(values.dcsj);
		await updateIEVisInfoData(info);
		setTableUpdate(!tableUpdate);
		setTaskUpdate(!taskUpdate);
	};

	const handleOk = () => {
		form.submit();
		form2.submit();
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 1000);
	};
	// 点击对话框的取消按钮
	const handleCancel = () => {
		setOpen(false);
	};


	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectTask.name + "的调查评估信息"}
			onOk={handleOk}
			onCancel={handleCancel}
			confirmLoading={confirmLoading}
		>
			<Space direction={"vertical"}>
				<Card title={"调查评估信息表"}
					  style={{ width: "900px" }}>
					<IEInfoForm form={form} onFinish={onFinish}
								initialValues={ieInfo} />
				</Card>
				<Card title={"调查评估走访信息表"}>
					<IeVisitForm form={form2} onFinish={onFinish2}
								 initialValues={ieVisInfo} />
				</Card>
			</Space>

		</Modal>
	);
}