import {
	getBBInfo,
	implBBInfoAccept,
	implBBInfoRefuse,
	modifyBBInfo,
	updateBBInfo,
} from "@/api/noexit";
import { ReportInfo } from "@/entity/NoExit/ReportInfo";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Form, Progress, Spin } from "antd";
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
	const [bbInfo, setBBInfo] = useState<ReportInfo>();

	useRequest(() => getBBInfo(dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				const { data: bbForm } = data;
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
		(detail: ReportInfo) => updateBBInfo(detail),
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
		(detail: ReportInfo) => implBBInfoAccept(detail),
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

	const { run: runImplRefuse } = useRequest(
		(detail: ReportInfo) => implBBInfoRefuse(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("审核不通过!");
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
		const bbInfo = values as ReportInfo;
		const isStore = form.getFieldValue("store");
		if (!isStore) {
			runSubmitForm(bbInfo);
		} else {
			runStore(bbInfo);
		}
	};

	const { run: runStore } = useRequest(
		(info) => modifyBBInfo(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					gMsg.onSuccess("保存成功!");
				}
			},
			manual: true,
			debounceWait: 300,
		}
	);

	const getSteps = (info: ReportInfo) => {
		if (!open || info == undefined) return [];

		return [
			{
				title: "填写相应的信息表",
				content: (
					<BBForm
						disabled={info ? info.step > 0 : false}
						form={form}
						onFinish={onFinish}
						initialValues={info}
					/>
				),
				check: () => info.step > 0,
			},
			{
				title: "公安审批",
				content: (
					<div className="content">
						<Spin tip="公安审核中...." size="large" />
						<Button
							type="link"
							onClick={() => {
								runImplAccept(info);
							}}>
							模拟公安审核(同意)
						</Button>
						<Button
							type="link"
							onClick={() => {
								runImplRefuse(info);
							}}>
							模拟公安审核(拒绝)
						</Button>
					</div>
				),
				check: () => info.step > 1,
			},
			{
				title: "审批结果",
				content: (
					<div className="content">
						<Progress
							type="circle"
							percent={100}
							format={() => "审批通过"}
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
					steps={bbInfo ? getSteps(bbInfo) : []}
					step={bbInfo ? bbInfo.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
