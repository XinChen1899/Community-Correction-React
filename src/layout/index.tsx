import { Layout, Tabs, theme } from "antd";

import AppContent from "./Content";
import AppFooter from "./Footer";
import AppHeader from "./Header";
import AppSider from "./Sider";

// 导航栏

export default function AppLayout(props: { children: any }) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const { children } = props;


	return (
		<Layout style={{ minHeight: "100vh" }}>
			<AppSider />

			<Layout
				className="site-layout"
				style={{ marginLeft: 200 }}>
				<AppHeader colorBgContainer={colorBgContainer} />

				<AppContent
					colorBgContainer={colorBgContainer}
					children={children}
				/>

				<AppFooter />
			</Layout>
		</Layout>
	);
}
