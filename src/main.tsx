import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/locale/zh_CN";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
).render(
	<BrowserRouter>
		<ConfigProvider locale={zhCN}>
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
