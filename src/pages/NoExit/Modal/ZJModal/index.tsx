import {
	getZJInfo,
	implZJInfoAccept,
	updateZJInfo,
} from "@/api/noexit";
import { ZJInfo } from "@/entity/NoExit/ZJInfo";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Form, Progress, Spin, message } from "antd";
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
	const [ZJInfo, setZJInfo] = useState<ZJInfo>({
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

	const onFinish = (values: any) => {
		const info = values as ZJInfo;
		console.log(info);
		runSubmitForm(info);
	};

	const getSteps = (info: ZJInfo) => {
		if (info == undefined) return [];

		return [
			{
				title: "填写相应的信息表",
				content: (
					<TemplateDescriptions
						title={"证件代管信息表"}
						info={[
							{
								value: (
									<ZJForm
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
			title="证件代管信息"
			InfoDescriptions={
				<TemplateSteps
					steps={ZJInfo ? getSteps(ZJInfo) : []}
					step={ZJInfo ? ZJInfo.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
