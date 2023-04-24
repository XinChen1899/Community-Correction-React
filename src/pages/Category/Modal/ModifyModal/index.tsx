import { getModifyInfo, implCateSFS, updateCate } from "@/api/cate";
import { CrpCategoryMoify } from "@/entity/Category/CategoryModifty";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Form, Progress, Spin, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { DataType } from "../..";
import { CategoryForm } from "../../Form/CategoryForm";

export default function ModifyModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
	openNotification: any;
}) {
	const {
		open,
		setOpen,
		info,
		gMsg,
		tableUpdate,
		setTableUpdate,
		openNotification,
	} = props;

	const [form] = Form.useForm();

	const { dxbh } = info;

	const [modifyInfo, setModifyInfo] = useState<CrpCategoryMoify>({
		dxbh: "",
	} as CrpCategoryMoify);

	const { run: runCateSFS } = useRequest(
		(info: CrpCategoryMoify) => implCateSFS(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					setTableUpdate(!tableUpdate);
					setOpen(false);
					openNotification();
				} else {
					gMsg.onError(data.message);
				}
			},
			manual: true,
		}
	);

	const { run: runUpdateCateModify } = useRequest(
		(info: CrpCategoryMoify) => updateCate(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					setOpen(false);
					setTableUpdate(!tableUpdate);
				} else {
					gMsg.onError(data.message);
				}
			},
			manual: true,
		}
	);

	// !查找 变更信息modifyInfo, 如果step <=0,则说明还在第一阶段
	useRequest(() => getModifyInfo(dxbh), {
		onSuccess({ data }) {
			if (data.status == "200") {
				const info = data.data;
				info.bdrq = dayjs(info.bdrq);
				info.sfsshsj = dayjs(info.sfsshsj);
				info.xjsqjzjgspsj = dayjs(info.xjsqjzjgspsj);

				setModifyInfo(data.data);
			} else {
				gMsg.onError(data.message);
			}
		},
		refreshDeps: [dxbh, tableUpdate],
		ready: dxbh != "" && open,
	});

	const onFinish = (values: any) => {
		const info = values as CrpCategoryMoify;
		console.log(info);

		runUpdateCateModify(info);
	};

	const getSteps = (info: CrpCategoryMoify) => {
		if (info == undefined || !open) return [];

		return [
			{
				title: "司法所准备",
				content:
					info.step <= 0 ? (
						<div className="content">
							<Button
								type="primary"
								onClick={() => {
									runCateSFS(info);
								}}>
								模拟司法所发送审批表
							</Button>
							<Spin
								tip="司法所准备审批表中"
								size="large"
							/>
						</div>
					) : (
						<div className="content">
							<Progress
								type="circle"
								percent={100}
								format={() => "发送审批表"}
							/>
						</div>
					),
				nextAction: () => {},
				check: () => info.step > 0,
			},
			{
				title: "社区矫正机构填写审批",
				content: (
					<TemplateDescriptions
						title={"矫正类别变更审批表"}
						info={[
							{
								value: (
									<CategoryForm
										disabled={info.step > 1}
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
					if (info.step == 1) form.submit();
				},
				check: () => info.step >= 1,
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
			title="变更矫正类别审批"
			InfoDescriptions={
				<TemplateSteps
					steps={modifyInfo ? getSteps(modifyInfo) : []}
					step={
						modifyInfo != undefined ? modifyInfo.step : 0
					}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
