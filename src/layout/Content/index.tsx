import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";

interface IContenterProps {
	colorBgContainer: string;
	// path: any;
	children: any;
	// dispatch: React.Dispatch<any>;
}

function AppContent(props: IContenterProps) {
	const { children } = props;
	const { pathname } = useLocation();
	const pathList = pathname.split("/").slice(2);

	return <Content style={{ margin: "0 16px" }}>{children}</Content>;
}

export default AppContent;
