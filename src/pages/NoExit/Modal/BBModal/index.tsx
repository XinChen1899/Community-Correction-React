import {
	getBBInfo,
	implBBInfoAccept,
	updateBBInfo,
} from "@/api/noexit";
import { BBInfo } from "@/entity/NoExit/BBInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Form, Progress, Spin, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { BBForm } from "../../Form/BBForm";

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

	useRequest(() => getBBInfo(dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				const { data: bbForm } = data;
				console.log(bbForm);
				bbForm.bbrq = dayjs(bbForm.bbrq);
				bbForm.bbksrq = dayjs(bbForm.bbksrq);
				bbForm.bbjsrq = dayjs(bbForm.bbjsrq);
				setBBInfo(bbForm);
			} else {
				gMsg.onError(data.message);
			}
		},
		onError: (error) => {
			gMsg.onError(error);
		},
		refreshDeps: [dxbh, tableUpdate],
		ready: dxbh != "" && open,
	});

	const { run: runSubmitForm } = useRequest(
		(detail: BBInfo) => updateBBInfo(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("提交成功!");
				} else {
					gMsg.onError(data.message);
				}
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			manual: true,
			debounceWait: 300,
		}
	);

	const { run: runImplAccept } = useRequest(
		(detail: BBInfo) => implBBInfoAccept(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("审核通过!");
				} else {
					gMsg.onError(data.message);
				}
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
				check: () => info.step > 1,
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
