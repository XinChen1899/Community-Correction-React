import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "@/pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<ConfigProvider locale={zhCN}>
			<Routes>
				<Route path={"/"} element={<Login />} />
				<Route path={"/admin/*"} element={<App />} />
			</Routes>
		</ConfigProvider>
	</BrowserRouter>
);
