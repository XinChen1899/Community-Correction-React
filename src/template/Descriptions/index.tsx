import { Descriptions } from "antd";

export default function TemplateDescriptions(props: {
	title: string;
	info: any[];
}) {
	const { title, info } = props;
	console.log(info);
	return (
		<Descriptions title={title} bordered layout="vertical">
			{info.map((item, idx) => {
				return (
					<Descriptions.Item label={item.label} key={idx}>
						{item.value}
					</Descriptions.Item>
				);
			})}
		</Descriptions>
	);
}
