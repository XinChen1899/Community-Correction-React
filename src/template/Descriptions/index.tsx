import { Descriptions } from "antd";

export default function TemplateDescriptions(props: {
	title: string;
	info: any[];
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
						label={item.label}
						key={idx}
						style={{ textAlign: "center" }}>
						{item.value}
					</Descriptions.Item>
				);
			})}
		</Descriptions>
	);
}
