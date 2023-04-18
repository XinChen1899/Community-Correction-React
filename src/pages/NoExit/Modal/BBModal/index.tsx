import TemplateModal from "@/template/Modal";
import { BBForm } from "../../Form/BBForm";
import { Button, Form, Progress, Spin, message } from "antd";
import { BBInfo } from "@/entity/NoExit/BBInfo";
import { getBBForm, implAccept, updateBBForm } from "@/api/noexit";
import { useState } from "react";
import { GMessage } from "@/utils/msg/GMsg";
import { getDate } from "@/utils/ie";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateSteps from "@/template/Steps";
import { useRequest } from "ahooks";
import { getCrpByDxbh } from "@/api/ic";
import dayjs from "dayjs";

// todo 报备流程审批

export default function BBModal(props: {
	open: boolean;
	setOpen: any;
	dxbh: string;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
}) {
	const { open, setOpen, dxbh, gMsg, tableUpdate, setTableUpdate } =
		props;
	const [form] = Form.useForm();
	const [bbInfo, setBBInfo] = useState<BBInfo>();

	useRequest(() => getBBForm(dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == 200) {
				const { data: bbForm } = data;
				bbForm.bbrq = dayjs(bbForm.bbrq);
				bbForm.bbksrq = dayjs(bbForm.bbksrq);
				bbForm.bbjsrq = dayjs(bbForm.bbjsrq);
				setBBInfo(bbForm);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [dxbh, tableUpdate],
		ready: dxbh != "",
	});

	const { run: runSubmitForm } = useRequest(
		(detail: BBInfo) => updateBBForm(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("提交成功!");
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
			debounceWait: 300,
		}
	);

	const { run: runImplAccept } = useRequest(
		(detail: BBInfo) => implAccept(detail),
		{
			onSuccess: () => {
				setTableUpdate(!tableUpdate);
				gMsg.onSuccess("审核通过!");
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
			debounceWait: 300,
		}
	);

	const onFinish = (values: any) => {
		const bbInfo = values as BBInfo;
		console.log(bbInfo);
		runSubmitForm(bbInfo);
	};

	const getSteps = (info: BBInfo) => {
		if (info == undefined) return [];

		return [
			{
				title: "填写相应的信息表",
				content: (
					<TemplateDescriptions
						title={"出入境信息表"}
						info={[
							{
								value: (
									<BBForm
										disabled={
											info
												? info.step > 0
												: false
										}
										form={form}
										onFinish={onFinish}
										initialValues={info}
									/>
								),
							},
						]}
					/>
				),
				nextAction: () => {
					if (info.step == 0) form.submit();
				},
				check: () => true,
			},
			{
				title: "公安审批",
				content:
					info.step <= 1 ? (
						<div className="content">
							<Button
								type="primary"
								onClick={() => {
									runImplAccept(info);
								}}>
								模拟公安审核(同意)
							</Button>
							<Spin tip="公安审核中...." size="large" />
						</div>
					) : (
						<div className="content">
							<Progress
								type="circle"
								percent={100}
								format={() => "审核通过"}
							/>
						</div>
					),
				nextAction: () => {},
				check: (current: number) => info.step > 1,
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
			title="出入境报备信息"
			InfoDescriptions={
				<TemplateSteps
					steps={bbInfo ? getSteps(bbInfo) : []}
					step={bbInfo ? bbInfo.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
