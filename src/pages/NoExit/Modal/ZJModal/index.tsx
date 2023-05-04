import {
	getZJInfo,
	implZJInfoAccept,
	implZJInfoRefuse,
	modifyZJInfo,
	updateZJInfo,
} from "@/api/noexit";
import { ZJInfo } from "@/entity/NoExit/ZJInfo";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Form, Progress, Spin } from "antd";
import { useState } from "react";
import { ZJForm } from "../../Form/ZJForm";

export default function ZJModal(props: {
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

	const [zjInfo, setZJInfo] = useState<ZJInfo>({
		dxbh: "",
	} as ZJInfo);

	useRequest(() => getZJInfo(dxbh), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				setZJInfo(data.data);
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
		(detail) => updateZJInfo(detail),
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
		(detail) => implZJInfoAccept(detail),
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
		(detail: ZJInfo) => implZJInfoRefuse(detail),
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

	const { run: runStore } = useRequest(
		(info) => modifyZJInfo(info),
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

	const onFinish = (values: any) => {
		const info = values as ZJInfo;
		const isStore = form.getFieldValue("store");
		if (!isStore) {
			runSubmitForm(info);
		} else {
			runStore(info);
		}
	};

	const getSteps = (info: ZJInfo) => {
		if (!open || info.dxbh == "") return [];

		return [
			{
				title: "填写相应的信息表",
				content: (
					<ZJForm
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
			title="证件代管信息"
			InfoDescriptions={
				<TemplateSteps
					steps={getSteps(zjInfo)}
					step={zjInfo ? zjInfo.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
