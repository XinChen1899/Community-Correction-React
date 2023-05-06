import { Layout, theme } from "antd";

import { useState } from "react";
import AppContent from "./Content";
import AppFooter from "./Footer";
import AppHeader from "./Header";
import AppSider from "./Sider";

export default function AppLayout(props: { children: any }) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const { children } = props;

	const [history, setHistory] = useState([]);

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
					history={history}
					setHistory={setHistory}
				/>

				<AppFooter />
			</Layout>
		</Layout>
	);
}
