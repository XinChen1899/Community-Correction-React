import { getModifyInfo, implCateSFS, updateCate } from "@/api/cate";
import { CrpCategoryMoify } from "@/entity/Category/CategoryModifty";
import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { getDate } from "@/utils/ie";
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
}) {
	const { open, setOpen, info, gMsg, tableUpdate, setTableUpdate } =
		props;
	const [form] = Form.useForm();
	const { dxbh } = info;

	const [modifyInfo, setModifyInfo] = useState<CrpCategoryMoify>(
		{} as CrpCategoryMoify
	);

	const { run: runCateSFS } = useRequest(
		(info: CrpCategoryMoify) => implCateSFS(info),
		{
			manual: true,
		}
	);

	const { run: runUpdateCateModify } = useRequest(
		(info: CrpCategoryMoify) => updateCate(info),
		{
			manual: true,
		}
	);

	// !查找 变更信息modifyInfo, 如果step <=0,则说明还在第一阶段
	useRequest(() => getModifyInfo(dxbh), {
		onSuccess({ data }) {
			if (data.status == 200) {
				const info = data.data;
				info.bdrq = dayjs(info.bdrq);
				info.sfsshsj = dayjs(info.sfsshsj);
				info.xjsqjzjgspsj = dayjs(info.xjsqjzjgspsj);
				console.log(info);
				setModifyInfo(data.data);
			}
		},
		refreshDeps: [dxbh, tableUpdate],
		ready: dxbh != "",
	});

	const onFinish = (values: any) => {
		const info = values as CrpCategoryMoify;
		info.bdrq = getDate(info.bdrq);
		info.sfsshsj = getDate(info.sfsshsj);
		info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
		console.log(info);

		runUpdateCateModify(info);
		setTableUpdate(!tableUpdate);
	};

	const getSteps = (info: CrpCategoryMoify) => {
		if (info == undefined) return [];

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
									setTableUpdate(!tableUpdate);
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
					step={modifyInfo ? modifyInfo.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
