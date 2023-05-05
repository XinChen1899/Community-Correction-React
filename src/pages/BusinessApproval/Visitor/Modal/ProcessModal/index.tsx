import {
	finishVisitorInfo,
	saveVisitorInfo,
	visSend2SFS,
	visSfsSendToJzjg,
} from "@/api/business/visitor";
import { VisitorInfo } from "@/entity/Business/Visitor/VisitorInfo";
import JZJGForm from "@/pages/BusinessApproval/BanOrder/Form/JZJGForm";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Progress, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { DataType } from "../..";

function ProcessModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
	setNotify: any;
}) {
	const {
		open,
		setOpen,
		info,
		tableUpdate,
		setTableUpdate,
		gMsg,
		setNotify,
	} = props;

	const { run: runSfsSendToJzjg } = useRequest(
		(info) => visSfsSendToJzjg(info),
		{
			onSuccess({ data }) {
				if (data.status == "200") {
					gMsg.onSuccess("收到司法所的信息!");
					setTableUpdate(!tableUpdate);
				} else {
					gMsg.onError(data.message);
				}
			},
			onFinally() {
				setOpen(false);
				setNotify();
			},
			manual: true,
		}
	);

	const { run: runFinishVisitor } = useRequest(
		(info) => finishVisitorInfo(info),
		{
			onSuccess({ data }) {
				if (data.status == "200") {
					gMsg.onSuccess("审批完成!");
					setTableUpdate(!tableUpdate);
				} else {
					gMsg.onError(data.message);
				}
			},
			onFinally: () => {
				setOpen(false);
			},
			manual: true,
		}
	);

	const { run: runSend2SFS } = useRequest(
		(info) => visSend2SFS(info),
		{
			onSuccess({ data }) {
				if (data.status == "200") {
					setTableUpdate(!tableUpdate);
				} else {
					gMsg.onError(data.message);
				}
			},
			manual: true,
		}
	);
	const [form] = useForm();

	const checkStep1 = (info: DataType) => {
		return (
			info.dxbh != "" &&
			info.hjrxm &&
			info.hkdd &&
			info.xm != "" &&
			info.hkyy != "" &&
			getDate(info.hksj) != "" &&
			getDate(info.sqrq) != ""
		);
	};

	const onFinish = (values: any) => {
		const d = values as VisitorInfo;
		d.step = info.step;
		d.dxbh = info.dxbh;
		d.processId = info.processId;
		const isStore = form.getFieldValue("store");
		if (!isStore) {
			runFinishVisitor(d);
		} else {
			runStore(d);
		}
	};

	const { run: runStore } = useRequest(
		(info) => saveVisitorInfo(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					gMsg.onSuccess("保存成功!");
					setTableUpdate(!tableUpdate);
				}
			},
			manual: true,
			debounceWait: 300,
		}
	);

	const getSteps = (info: DataType) => {
		if (info == undefined || !open) return [];

		return [
			{
				title: "填写相应的信息表",
				content: (
					<TemplateDescriptions
						title={"进入特定场所审批表"}
						info={[
							{ label: "对象编号", value: info.dxbh },
							{ label: "对象姓名", value: info.xm },
							{
								label: "会见人姓名",
								value: info.hjrxm,
							},
							{
								label: "会客时间",
								value: getDate(info.hksj),
							},
							{
								label: "会客地点",
								value: info.hkdd,
							},

							{
								label: "申请时间",
								value: getDate(info.sqrq),
							},
							{ label: "会客原因", value: info.hkyy },
						]}
					/>
				),
				nextAction: () => {
					if (info.step == 0) runSend2SFS(info);
				},
				check: () => checkStep1(info),
			},
			{
				title: "司法所审批",
				content:
					info.step <= 1 ? (
						<div className="content">
							<Button
								type="link"
								onClick={() => {
									runSfsSendToJzjg(info);
								}}>
								模拟司法所审核
							</Button>
							<Spin tip="司法所审核中" size="large" />
						</div>
					) : (
						<div className="content">
							<Progress
								type="circle"
								percent={100}
								format={() => "审批完成"}
							/>
						</div>
					),
				check: () => info.step > 1,
			},
			{
				title: "社区矫正机构审批",
				content: (
					<TemplateDescriptions
						title={"会客审批表"}
						info={[
							{
								label: "司法所审核人",
								value: info.sfsshr,
							},
							{
								label: "司法所审核时间",
								value: getDate(info.sfsshsj),
							},
							{
								label: "司法所审核意见",
								value: info.sfsshyj,
							},
							{
								label: "社区矫正机构审批",
								span: 3,
								value: (
									<JZJGForm
										form={form}
										onFinish={onFinish}
										initialValues={info}
									/>
								),
							},
						]}
					/>
				),
				check: () => info.step > 2,
			},
			{
				title: "审批结果",
				content: (
					<div className="content">
						<Progress
							type="circle"
							percent={100}
							format={() => "审批完成"}
						/>
					</div>
				),
			},
		];
	};

	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateSteps
					steps={getSteps(info)}
					step={info ? info.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}

export default ProcessModal;
