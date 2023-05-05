import TemplateForm, { getFormItem } from "@/template/Form";
import { generateSelect, spjgMap } from "@/utils";
import { Button, DatePicker, Input, Space } from "antd";

export default function JZJGForm(props: {
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
					"spjg",
					"县级社区矫正机构审批结果",
					generateSelect(spjgMap),
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
