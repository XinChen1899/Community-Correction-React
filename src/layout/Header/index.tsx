import { Header } from "antd/es/layout/layout";

interface IHeaderProps {
	colorBgContainer: string;
}

export default function AppHeader(props: IHeaderProps) {
	const { colorBgContainer } = props;

	return (
		<Header
			style={{ padding: 0, background: colorBgContainer }}
			title="欢迎使用社区矫正监督管理子系统">
			<div
				style={{
					width: 1000,
					textAlign: "center",
					fontSize: "28px",
				}}>
				欢迎使用社区矫正监督管理子系统
			</div>
		</Header>
	);
}
