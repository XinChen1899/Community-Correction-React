import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";

interface IContenterProps {
	colorBgContainer: string;
	children: any;
}

function AppContent(props: IContenterProps) {
	const { children } = props;

	return <Content style={{ margin: "0 16px" }}>{children}</Content>;
}

export default AppContent;
