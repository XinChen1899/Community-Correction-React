import { Descriptions } from "antd";

interface IDescriptionItem {
	label?: string;
	value?: string | JSX.Element | number;
	span?: number;
}

export default function TemplateDescriptions(props: {
	title: string;
	info: IDescriptionItem[];
	layout?: "vertical" | "horizontal";
}) {
	const { title, info, layout } = props;

	return (
		<Descriptions
			title={title}
			bordered
			layout={layout ? layout : "vertical"}>
			{info.map((item, idx) => {
				return (
					<Descriptions.Item
						label={item.label ? item.label : ""}
						key={idx}
						span={item.span ? item.span : 1}
						style={{ textAlign: "center" }}>
						{item.value}
					</Descriptions.Item>
				);
			})}
		</Descriptions>
	);
}
