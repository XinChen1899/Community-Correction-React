import { Content } from "antd/es/layout/layout";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { routeNameMap } from "@/router";

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

	return (
		<Content style={{ margin: "0 16px" }}>
			<Breadcrumb style={{ margin: "16px 0" }}>
				{pathList.map((item: string, idx: number) => {
					return (
						<Breadcrumb.Item key={idx}>
							{
								routeNameMap[
									item as keyof typeof routeNameMap
								]
							}
						</Breadcrumb.Item>
					);
				})}
			</Breadcrumb>

			{children}
		</Content>
	);
}

export default AppContent;
