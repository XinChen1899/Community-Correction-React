import TemplateDescriptions from "@/template/Descriptions";
import TemplateModal from "@/template/Modal";
import TemplateSteps from "@/template/Steps";
import { DataType } from "../..";
import { DatePicker, Input, Progress, Spin } from "antd";

function ProcessModal(props: {
	open: boolean;
	setOpen: any;
	info: DataType;
}) {
	const { open, setOpen, info } = props;

	const steps = [
		{
			title: "填写相应的信息表",
			content: (
				<TemplateDescriptions
					title={"进入特定场所审批表"}
					info={[
						{ label: "对象编号", value: info.dxbh },
						{ label: "对象姓名", value: info.xm },
						{
							label: "申请进入场所",
							value: info.sqjrcs,
						},
						{ label: "申请日期", value: info.sqrq },
						{ label: "申请理由", value: info.sqly },
					]}
				/>
			),
		},
		{
			title: "司法所审批",
			content:
				info.step == 1 ? (
					<div className="content">
						<Spin tip="司法所审批中" size="large" />
					</div>
				) : (
					<div className="content">
						<Progress
							type="circle"
							percent={100}
							format={() => "审批完成"}
						/>
					</div>
				),
		},
		{
			title: "社区矫正机构审批",
			content: (
				<TemplateDescriptions
					title={"进入特定场所审批表"}
					info={[
						{ label: "司法所审核人", value: info.sfsshr },
						{
							label: "司法所审核时间",
							value: info.sfsshsj,
						},
						{
							label: "司法所审核意见",
							value: info.sfsshyj,
						},
						{
							label: "县级社区矫正机构审批人",
							value: <Input />,
						},
						{
							label: "县级社区矫正机构审批时间",
							value: <DatePicker />,
						},
						{
							label: "县级社区矫正机构审批意见",
							value: <Input.TextArea />,
						},
					]}
				/>
			),
		},
		{
			title: "审批完成",
			content: (
				<TemplateDescriptions
					title={"审核结果"}
					info={[
						{
							label: "县级社区矫正机构审批结果",
							value: <Input.TextArea />,
						},
					]}
				/>
			),
		},
	];
	return (
		<TemplateModal
			InfoDescriptions={
				<TemplateSteps steps={steps} step={info.step} />
			}
			open={open}
			setOpen={setOpen}
		/>
	);
}

export default ProcessModal;
