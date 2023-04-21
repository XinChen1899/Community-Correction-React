import {
	getRewardLgInfo,
	lgImplSJ,
	lgSend2Sj,
} from "@/api/assessment/reward";
import { RewardLg } from "@/entity/Assessment/Reward/RewardLg";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { map2Value, spjgMap } from "@/utils";
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
import dayjs from "dayjs";
import { useState } from "react";
import { DataType } from "../..";

/**
 * 立功审批流程
 * @param props
 * @returns
 */
function ProcessLgModal(props: {
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
	// todo 提交并且发送发送信息表给市局
	const { run: runSend2Sj } = useRequest(
		(info: RewardLg) => lgSend2Sj(info),
		{
			onSuccess: () => {
				gMsg.onSuccess("已发送给市局矫正机构!");
				setTableUpdate(!tableUpdate);
				setOpen(false);
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
			debounceWait: 300,
		}
	);
	// todo 模拟市局审批
	const { run: runImplSj } = useRequest(
		(info: RewardLg) => lgImplSJ(info),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("市局审批完成!");
				setOpen(false);
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			onFinally() {
				setNotify(true);
			},
			manual: true,
			debounceWait: 300,
		}
	);
	const [reward, setReward] = useState<RewardLg>({} as RewardLg);
	// todo 获取信息表
	useRequest(() => getRewardLgInfo(info.rewardId), {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setReward(data.data);

				if (reward.xjsqjzjgspsj)
					reward.xjsqjzjgspsj = dayjs(reward.xjsqjzjgspsj);
				if (reward.sjsqjzjgspsj)
					reward.sjsqjzjgspsj = dayjs(reward.sjsqjzjgspsj);

				console.log(reward);
			}
		},
		onError: (err) => {
			gMsg.onError(err);
		},
		refreshDeps: [tableUpdate, info.rewardId],
		ready: info != undefined && open,
	});

	// todo 发起审批更新操作

	const [form] = useForm();

	const getSteps = (detail: RewardLg) => {
		if (!detail || !open) return [];
		return [
			{
				title: "社区矫正机构审批",
				content: (
					<TemplateDescriptions
						title="县级立功审批表"
						info={[
							{
								value: (
									<Form
										form={form}
										initialValues={{ detail }}
										onFinish={(values) => {
											const d =
												values as RewardLg;
											d.step = 0;
											d.id = info.rewardId;
											d.dxbh = info.dxbh;
											d.processId =
												reward.processId;
											console.log(d);
											runSend2Sj(d);
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
									</Form>
								),
							},
						]}
					/>
				),
				nextAction: () => {
					if (detail && detail.step <= 0) {
						form.submit();
					}
				},
				check: () => true,
			},
			{
				title: "市局社区矫正机构审批",
				content:
					detail.step <= 1 ? (
						<div className="content">
							<Button
								type="primary"
								onClick={() => {
									runImplSj(detail);
								}}>
								模拟市局社区矫正机构
							</Button>
							<Spin
								tip="市局社区矫正机构审核中"
								size="large"
							/>
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
				check: () => detail.step > 1,
			},
			{
				title: "立功审批结果",
				content: (
					<div className="content">
						{detail.spjg == "02" ? (
							<Progress
								type="circle"
								percent={100}
								format={() =>
									map2Value(spjgMap, detail.spjg)
								}
								status="exception"
							/>
						) : (
							<Progress
								type="circle"
								percent={100}
								status="success"
								format={() =>
									map2Value(spjgMap, detail.spjg)
								}
							/>
						)}
						<TemplateDescriptions
							title={"市局审批表"}
							info={[
								{
									label: "市局审批人",
									value: detail.sjsqjzjgspr,
								},
								{
									label: "市局审批时间",
									value: getDate(
										detail.sjsqjzjgspsj
									),
								},
								{
									label: "市局审批人意见",
									value: detail.sjsqjzjgspyj,
								},
							]}
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
					steps={getSteps(reward)}
					step={reward.step ? reward.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
			onOk={() => {
				setOpen(false);
			}}
		/>
	);
}

export default ProcessLgModal;
