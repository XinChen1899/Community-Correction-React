import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import { routeNameMap, RouterData } from "@/router/config";
import React, { useEffect } from "react";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";
import { Home } from "@/pages";

interface IContenterProps {
	colorBgContainer: string;
	path: any;
	dispatch: React.Dispatch<any>;
}

function AppContent(props: IContenterProps) {
	// const { colorBgContainer } = props;
	const { path } = props;
	const curPath: string = path.path;
	const pathList = curPath.split("/");

	return (
		<Content style={{ margin: "0 16px" }}>
			<Breadcrumb style={{ margin: "16px 0" }}>
				{pathList.map((item: string) => {
					return (
						<Breadcrumb.Item key={item}>
							{
								routeNameMap[
									item as keyof typeof routeNameMap
									]
							}
						</Breadcrumb.Item>
					);
				})}
			</Breadcrumb>

			<Routes>
				{/*默认路由*/}
				<Route path={"/"} element={<Home />} />
				{RouterData}
			</Routes>
		</Content>
	);
}

export default AppContent;
