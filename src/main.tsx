import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
).render(
	<BrowserRouter>
		<ConfigProvider
			locale={zhCN}
			theme={{
				token: {
					colorPrimary: "#5A54F9", // 设置主题色
				},
			}}>
			<Suspense
				fallback={
					<div className="spin">
						<Spin tip="Loading..." />
					</div>
				}>
				<Routes>
					<Route path={"/*"} element={<App />} />
				</Routes>
			</Suspense>
		</ConfigProvider>
	</BrowserRouter>
);
