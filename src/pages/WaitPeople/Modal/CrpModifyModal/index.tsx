import { Card, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { Space } from "antd/lib";
import { GMessage } from "@/coderepo/msg/GMsg";
import { DataType } from "../..";
import { RegisterForm } from "../../Form/RegisterForm";
import { CorrectionPeople } from "@/entity/IC/Crp";
import { getCrpById, updateCrp } from "@/api/ic";
import dayjs from "dayjs";
import { getDate } from "@/coderepo/ie";
import { mzMap } from "@/coderepo";

const defaultCrp: CorrectionPeople = {
	sqjzdxbh: "",
	sfdcpg: false,
	jzlb: "",
	xm: "null",
	xb: "",
	mz: "",
	gj: "",
	hjlx: "",
	sfzhm: "",
	csrq: "",
	whcd: "",
	hyzk: "",
	jyjxqk: "",
	xzzmm: "",
	xgzdw: "",
	dwlxdh: "",
	grlxdh: "",
	ywjtcyjzyshgx: "",
	zp: "",
};

export default function CrpModifyModal(props: {
	open: boolean;
	setOpen: any;
	selectRecord: DataType;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
	infoUpdate: any;
	setInfoUpdate: any;
}) {
	const {
		open,
		setOpen,
		selectRecord,
		gMsg,
		tableUpdate,
		setTableUpdate,
		infoUpdate,
		setInfoUpdate,
	} = props;

	const [confirmLoading, setConfirmLoading] = useState(false);

	const { dxbh } = selectRecord;

	const [crp, setCrp] = useState<CorrectionPeople>(defaultCrp);
	useEffect(() => {
		if (dxbh) {
			getCrpById(
				dxbh,
				(crp: CorrectionPeople) => {
					crp.csrq = dayjs(crp.csrq);
					setCrp(crp);
				},
				() => gMsg.onError("找不到此对象!")
			);

			console.log(crp);
		}
	}, [dxbh, infoUpdate]);

	const [form] = Form.useForm();

	useEffect(() => {
		form.resetFields();
		form.setFieldsValue(crp);
	});

	const onFinish = async (values: any) => {
		const crp = values as CorrectionPeople;
		crp.csrq = getDate(crp.csrq);
		mzMap.forEach((obj) => {
			if (obj.code == crp.mz) {
				crp.mz = obj.value;
				return;
			}
		});
		updateCrp(
			crp,
			() => {
				gMsg.onSuccess("修改成功！");
				setTableUpdate(!tableUpdate);
				setInfoUpdate(!infoUpdate);
			},
			(msg: string) => {
				gMsg.onError("修改失败！" + msg);
			},
		);
	};

	const handleOk = () => {
		form.submit();
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 500);
	};

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			title={"修改" + selectRecord.name + "的基本信息"}
			onOk={handleOk}
			onCancel={() => setOpen(false)}
			confirmLoading={confirmLoading}>
			<Space direction={"vertical"}>
				<Card
					title={"社区矫正对象信息表"}
					style={{ width: "900px" }}>
					<RegisterForm
						form={form}
						onFinish={onFinish}
						initialValues={crp}
					/>
				</Card>
			</Space>
		</Modal>
	);
}
