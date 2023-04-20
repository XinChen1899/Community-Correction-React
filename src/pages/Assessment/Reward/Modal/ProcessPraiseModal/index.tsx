import { RewardPraise } from "@/entity/Assessment/Reward/RewardPraise";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { generateSelect, map2Value, spjgMap } from "@/utils";
import { GMessage } from "@/utils/msg/GMsg";
import { DatePicker, Form, Input, Progress, message } from "antd";
import { useForm } from "antd/es/form/Form";
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

	// const { run: runSend2SFS } = useRequest(
	// 	(info: DataType) => send2SFS(info),
	// 	{
	// 		onSuccess: () => {
	// 			setTableUpdate(!tableUpdate);
	// 			gMsg.onSuccess("已向司法所发送禁止令！");
	// 		},
	// 		onError: (err) => {
	// 			gMsg.onError(err);
	// 		},
	// 		onFinally: () => {},
	// 		manual: true,
	// 		debounceWait: 300,
	// 	}
	// );
	// todo 获取到RewardPraise的信息
	const [praise, setPraise] = useState<RewardPraise>(
		{} as RewardPraise
	);

	// todo 发起审批更新操作

	const [form] = useForm();

	const getSteps = (info: DataType) => {
		if (info == undefined) return [];

		return [
			{
				title: "社区矫正机构审批",
				content: (
					<TemplateDescriptions
						title={"表扬审批表"}
						info={[
							{
								value: (
									<Form
										form={form}
										initialValues={{ info }}
										onFinish={(values) => {
											const d =
												values as RewardPraise;
											// const d =
											// 	values as BanInfo;
											// d.step = info.step;
											// d.dxbh = info.dxbh;
											// runSend2JZJG(d);
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
				title: "社区矫正机构审批结果",
				content: (
					<div className="content">
						<Progress
							type="circle"
							percent={100}
							format={() =>
								map2Value(spjgMap, praise.spjg)
							}
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
					step={info.step}
				/>
			}
			open={open}
			setOpen={setOpen}
			onOk={() => {
				setTableUpdate(!tableUpdate);
				setOpen(false);
			}}
		/>
	);
}

export default ProcessPraiseModal;
