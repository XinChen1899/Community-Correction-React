import {
	getModifyInfo,
	implCateSFS,
	modifyCate,
	updateCate,
} from "@/api/cate";
import { CrpCategoryMoify } from "@/entity/Category/CategoryModifty";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { Button, Form, Progress, Spin } from "antd";
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
					gMsg.onSuccess("审批完成!");
					setOpen(false);
					setTableUpdate(!tableUpdate);
				} else {
					gMsg.onError(data.message);
				}
			},
			manual: true,
		}
	);

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

	const { run: runStore } = useRequest((info) => modifyCate(info), {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				gMsg.onSuccess("保存成功!");
			}
		},
		manual: true,
		debounceWait: 300,
	});

	const onFinish = (values: any) => {
		const info = values as CrpCategoryMoify;
		const isStore = form.getFieldValue("store");
		console.log(info);
		if (!isStore) {
			runUpdateCateModify(info);
		} else {
			runStore(info);
		}
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
				check: () => info.step > 0,
			},
			{
				title: "社区矫正机构填写审批",
				content: (
					<CategoryForm
						disabled={info.step > 1}
						form={form}
						onFinish={onFinish}
						initialValues={info}
					/>
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
							format={() => "审批完成"}
						/>
					</div>
				),
			},
		];
	};

	return (
		<TemplateModal
			title="变更管理类别审批"
			InfoDescriptions={
				<TemplateSteps
					steps={getSteps(modifyInfo)}
					step={modifyInfo ? modifyInfo.step : 0}
				/>
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}
