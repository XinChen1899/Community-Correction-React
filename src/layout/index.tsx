import { Layout, Tabs, theme } from "antd";
import { SiderTheme } from "antd/es/layout/Sider";
import { useRef, useState } from "react";

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

	const [siderTheme, setSiderTheme] = useState<SiderTheme>("light");

	const changeSiderTheme = (value: boolean) => {
		setSiderTheme(value ? "dark" : "light");
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<AppSider
				appTheme={siderTheme}
			/>

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
