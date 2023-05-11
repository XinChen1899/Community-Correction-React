import {
	getRewardPraiseInfo,
	saveRewardPraiseInfo,
} from "@/api/assessment/reward";
import { RewardPraise } from "@/entity/Assessment/Reward/RewardPraise";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { generateSelect, map2Value, spjgMap } from "@/utils";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { DatePicker, Form, Input, Progress, message } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useState } from "react";
import { DataType } from "../..";

// 表扬审批流程
function ProcessPraiseModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, tableUpdate, setTableUpdate, gMsg } =
		props;

	const { run } = useRequest(
		(info: RewardPraise) => saveRewardPraiseInfo(info),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("审批成功");
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
			debounceWait: 300,
		}
	);
	const [praise, setPraise] = useState<RewardPraise>(
		{} as RewardPraise
	);
	useRequest(() => getRewardPraiseInfo(info.rewardId), {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				setPraise(data.data);

				if (praise.xjsqjzjgspsj)
					praise.xjsqjzjgspsj = dayjs(praise.xjsqjzjgspsj);
			}
		},
		onError: (err) => {
			gMsg.onError(err);
		},
		refreshDeps: [tableUpdate, info.rewardId],
		ready: info && open,
	});

	// todo 发起审批更新操作

	const [form] = useForm();

	const getSteps = (detail: RewardPraise) => {
		if (!detail || !open) return [];
		// console.log("表扬审批步骤!");
		// console.log(detail, info);
		return [
			{
				title: "社区矫正机构审批",
				content: (
					<TemplateDescriptions
						title="表扬审批表"
						info={[
							{
								// label: "表扬审批表",
								value: (
									<Form
										form={form}
										initialValues={{ detail }}
										onFinish={(values) => {
											const d =
												values as RewardPraise;
											d.step = 0;
											d.id = info.rewardId;
											d.dxbh = info.dxbh;
											console.log(d);
											run(d);
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
				nextAction: () => {
					console.log(detail);
					if (detail && detail.step <= 0) {
						console.log("a");
						form.submit();
					}
				},
				check: (current: number) => true,
			},
			{
				title: "社区矫正机构审批结果",
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
					steps={getSteps(praise)}
					step={praise.step ? praise.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}

export default ProcessPraiseModal;
