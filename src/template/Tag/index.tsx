import { Tag } from "antd";

export enum TagType {
	Accept = "#389e0d",
	Error = "#f5222d",
	Warning = "#faad14",
	Info = "#2196f3",
}

function TemplateTag(props: { value: string; type: TagType }) {
	const { value, type } = props;
	return <Tag color={type}>{value}</Tag>;
}

export default TemplateTag;
