import { ZJInfo } from "@/entity/NoExit/ZJInfo";
import TemplateForm, { getFormItem } from "@/template/Form";
import { generateSelect, zjMap } from "@/utils";
import { Button, Input, Space } from "antd";
import { FormInstance } from "antd/lib";

/**
 * 出入境证件代管信息 表单
 */
export function ZJForm(props: {
	form: FormInstance<any>;
	onFinish: (values: any) => void;
	initialValues: ZJInfo;
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
					"zj",
					"出入境证件种类",
					generateSelect(zjMap, {
						disabled,
					}),
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
