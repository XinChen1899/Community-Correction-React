import { storeUncorr, updateUnCorr } from "@/api/uncorrected";
import { UnCorrectdInfo } from "@/entity/Uncorrected/UnCorrectedInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { map2Value, spjgMap } from "@/utils";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Progress, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { UncorrectForm } from "../Form/UncorrectedForm";
import { DataType } from "../Handle";

/**
 * 解除矫正审批流程
 * @param props
 * @returns
 */
function ProcessModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	tableUpdate: boolean;
	setTableUpdate: any;
	gMsg: GMessage;
}) {
	const { open, setOpen, info, tableUpdate, setTableUpdate, gMsg } =
		props;

	const { run: runUpdate } = useRequest(
		(detail) => updateUnCorr(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == 200 && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("更新成功!");
				}
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
		}
	);

	const { run: runStore } = useRequest(
		(detail) => storeUncorr(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == 200 && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("保存成功!");
				}
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
		}
	);

	useEffect(() => {
		if (info.jcjzrq) info.jcjzrq = dayjs(info.jcjzrq);
	}, [info]);

	// todo 更新终止矫正信息

	const [form] = useForm();

	const getSteps = (detail: UnCorrectdInfo) => {
		if (!detail || !open) return [];

		return [
			{
				title: "司法所提交建议",
				content:
					detail.step <= 0 ? (
						<div className="content">
							<Spin tip="司法所准备中" size="large" />
						</div>
					) : (
						<div className="content">
							<Progress
								type="circle"
								percent={100}
								format={() => "已提交"}
							/>
						</div>
					),
				nextAction: () => {},
				check: () => detail.step > 0,
			},
			{
				title: "社区矫正机构审批",
				content: (
					<TemplateDescriptions
						title="解除矫正审批表"
						info={[
							{
								value: (
									<UncorrectForm
										form={form}
										onFinish={(values: any) => {
											const store =
												form.getFieldValue(
													"store"
												);
											const d =
												values as DataType;
											d.dxbh = detail.dxbh;
											d.processId =
												detail.processId;
											if (store) {
												runStore(d);
											} else {
												runUpdate(d);
											}
										}}
										initialValues={detail}
									/>
								),
							},
						]}
					/>
				),
				store: true,
				onStore: () => {
					form.setFieldValue("store", true);
					form.submit();
				},
				nextAction: () => {
					if (detail && detail.step <= 1) {
						form.submit();
					}
				},
				check: () => true,
			},
			{
				title: "审批结果",
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
