import { ReportInfo } from "@/entity/NoExit/ReportInfo";
import TemplateForm, { getFormItem } from "@/template/Form";
import { crjzjzlMap, generateSelect } from "@/utils";
import { Button, DatePicker, FormInstance, Input, Space } from "antd";

/**
 * 出入境报备信息 表单
 */
export function BBForm(props: {
	form: FormInstance<any>;
	onFinish: (values: any) => void;
	initialValues: ReportInfo;
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
					"crjzjzl",
					"出入境证件种类",
					generateSelect(crjzjzlMap, {
						disabled,
					}),
					true
				),
				getFormItem(
					"crjzjhm",
					"出入境证件号码",
					<Input />,
					true
				),
				getFormItem(
					"bbsldw",
					"报备受理单位",
					<Input />,
					true
				),
				getFormItem("bbdw", "报备单位", <Input />, true),
				getFormItem("bbrq", "报备日期", <DatePicker />, true),
				getFormItem(
					"bbksrq",
					"报备开始日期",
					<DatePicker />,
					true
				),
				getFormItem(
					"bbjsrq",
					"报备结束日期",
					<DatePicker />,
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
