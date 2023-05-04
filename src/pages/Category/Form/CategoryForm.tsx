import TemplateForm, { getFormItem } from "@/template/Form";
import { generateSelect, nsyjzlbMap } from "@/utils";
import { Button, DatePicker, Input, Space } from "antd";
import "react";

/**
 * 变更分类管理 表单
 */
export function CategoryForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;

	return (
		<TemplateForm
			disabled={disabled}
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}
			formTable={[
				getFormItem(
					"dxbh",
					"社区矫正对象编号",
					<Input disabled />
				),
				getFormItem(
					"gllb",
					"管理类别",
					generateSelect(nsyjzlbMap, {
						disabled: true,
					})
				),
				getFormItem("tzyy", "调整原因", <Input disabled />),
				getFormItem(
					"bdrq",
					"变动日期",
					<DatePicker disabled />
				),
				getFormItem(
					"sfsshr",
					"受委托的司法所审核人",
					<Input disabled />
				),
				getFormItem(
					"sfsshsj",
					"司法所审核时间",
					<DatePicker disabled />
				),
				getFormItem(
					"sfsshyj",
					"司法所审核意见",
					<Input disabled />
				),
				getFormItem(
					"xjsqjzjgspr",
					"县级社区矫正机构审批人",
					<Input />,
					true
				),
				getFormItem(
					"xjsqjzjgspsj",
					"县级社区矫正机构审批时间",
					<DatePicker />,
					true
				),
				getFormItem(
					"xjsqjzjgspyj",
					"县级社区矫正机构审批意见",
					<Input.TextArea />,
					true
				),
				getFormItem(
					"",
					"",
					<Space>
						<Button
							type="primary"
							onClick={() => {
								form.setFieldValue("store", true);
								form.submit();
							}}>
							保存
						</Button>
						<Button
							type="primary"
							onClick={() => {
								form.setFieldValue("store", false);
								form.submit();
							}}>
							提交
						</Button>
					</Space>
				),
			]}
		/>
	);
}
