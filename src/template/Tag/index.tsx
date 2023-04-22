import { Tag } from "antd";

export enum MyTagType {
	Accept = "#389e0d",
	Error = "#f5222d",
	Warning = "#faad14",
	Info = "#2196f3",
	Refuse = "#fa541c",
}

function TemplateTag(props: {
	value: string | number;
	type: MyTagType;
}) {
	const { value, type } = props;
	return <Tag color={type}>{value}</Tag>;
}

export default TemplateTag;
