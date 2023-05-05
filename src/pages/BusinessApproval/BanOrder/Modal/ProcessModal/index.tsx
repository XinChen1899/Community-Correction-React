import {
	finishBBInfo,
	saveBanInfo,
	send2SFS,
	sfsSendToJzjg,
} from "@/api/business/ban";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Progress, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { DataType } from "../..";
import JZJGForm from "../../Form/JZJGForm";

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
		(info: DataType) => sfsSendToJzjg(info),
		{
			onSuccess() {
				setTableUpdate(!tableUpdate);
			},
			onFinally() {
				setOpen(false);
				setNotify();
			},
			manual: true,
		}
	);

	const { run: runFinishBBInfo } = useRequest(
		(info: DataType) => finishBBInfo(info),
		{
			onSuccess({ data }) {
				if (data.status == "200") {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("审批成功!");
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
		(info: DataType) => send2SFS(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("已向司法所发送禁止令！");
				} else {
					gMsg.onError(data.message);
				}
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
		}
	);
	const [form] = useForm();

	const onFinish = (values: any) => {
		const d = values as BanInfo;
		d.step = info.step;
		d.dxbh = info.dxbh;
		d.processId = info.processId;
		const isStore = form.getFieldValue("store");
		if (!isStore) {
			runFinishBBInfo(d);
		} else {
			runStore(d);
		}
	};

	const checkStep1 = (info: DataType) => {
		return (
			info.dxbh != "" &&
			info.xm != "" &&
			info.sqjrcs != "" &&
			getDate(info.sqrq) != "" &&
			info.sqly != ""
		);
	};

	const { run: runStore } = useRequest(
		(info) => saveBanInfo(info),
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
								label: "申请进入场所",
								value: info.sqjrcs,
							},
							{
								label: "申请日期",
								value: getDate(info.sqrq),
							},
							{ label: "申请理由", value: info.sqly },
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
				check: (current: number) => info.step > 1,
			},
			{
				title: "社区矫正机构审批",
				content: (
					<TemplateDescriptions
						title={"进入特定场所审批表"}
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
					step={info.step ? info.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}

export default ProcessModal;
