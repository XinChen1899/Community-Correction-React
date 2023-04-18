// 调查评估意见书
import TemplateForm from "@/template/Form";
import { Input } from "antd";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

/**
 * 调查评估意见书
 */
export function SuggestForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	quillValue: any;
	setQuillValue: any;
	disabled?: boolean;
}) {
	const {
		form,
		onFinish,
		initialValues,
		disabled,
		quillValue,
		setQuillValue,
	} = props;

	return (
		<>
			<TemplateForm
				disabled={disabled}
				form={form}
				onFinish={onFinish}
				initialValues={initialValues}
				formTable={[
					{
						name: "wtbh",
						label: "委托编号",
						component: <Input disabled />,
					},
					{
						name: "dcyjshr",
						label: "调查评估意见审核人",
						component: <Input />,
					},
					{
						label: "调查评估意见书",
					},
				]}
			/>
			<ReactQuill
				theme="snow"
				value={quillValue}
				onChange={setQuillValue}
			/>
		</>
	);
}
