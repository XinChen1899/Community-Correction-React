import {
	send2JZJG,
	send2SFS,
	sfsSendToJzjg,
} from "@/api/business/ban";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { generateSelect, spjgMap } from "@/utils";
import { getDate } from "@/utils/ie";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Progress,
	Spin,
	message,
} from "antd";
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

	const { run: runSend2JZJG } = useRequest(
		(info: DataType) => send2JZJG(info),
		{
			onSuccess() {
				setTableUpdate(!tableUpdate);
			},

			manual: true,
		}
	);

	const { run: runSend2SFS } = useRequest(
		(info: DataType) => send2SFS(info),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("已向司法所发送禁止令！");
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
		}
	);
	const [form] = useForm();

	const getSteps = (info: DataType) => {
		if (info == undefined) return [];

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
				check: () => true,
			},
			{
				title: "司法所审批",
				content:
					info.step <= 1 ? (
						<div className="content">
							<Button
								type="primary"
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
				nextAction: () => {},
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
								value: (
									<Form
										form={form}
										initialValues={{ info }}
										onFinish={(values) => {
											const d =
												values as BanInfo;
											d.step = info.step;
											d.dxbh = info.dxbh;
											d.processId =
												info.processId;
											runSend2JZJG(d);
										}}>
										<Form.Item
											name="xjsqjzjgspr"
											label="社区矫正机构审批人">
											<Input />
										</Form.Item>
										<Form.Item
											name="xjsqjzjgspsj"
											label="县级社区矫正机构审批时间">
											<DatePicker />
										</Form.Item>
										<Form.Item
											name="xjsqjzjgspyj"
											label="县级社区矫正机构审批意见">
											<Input.TextArea />
										</Form.Item>
										<Form.Item
											name="spjg"
											label="县级社区矫正机构审批结果">
											{generateSelect(spjgMap)}
										</Form.Item>
									</Form>
								),
							},
						]}
					/>
				),
				nextAction: (current: number) => {
					if (info && info.step <= current) form.submit();
				},
				check: (current: number) => true,
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
				nextAction: () => {
					message.info("审批完成！");
				},
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
