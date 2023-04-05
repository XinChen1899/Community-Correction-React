import {
	CorrectionPlan,
	CorrectionTeam,
	Home,
	IE,
	WaitPeople,
	Worker,
} from "@/pages";
import { Route } from "react-router-dom";
import {
	HomeOutlined,
	PieChartOutlined,
	SearchOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import React from "react";

interface IPageItem {
	id: string;
	title: string;
	component: () => JSX.Element;
}

interface IRouterItem {
	page: IPageItem;
	children: IPageItem[];
	icon?: React.ReactNode;
}

function getPageItem(
	id: string,
	title: string,
	component?: () => JSX.Element
) {
	return {
		id,
		title,
		component,
	} as IPageItem;
}

function getRouterItem(
	page: IPageItem,
	children?: IPageItem[],
	icon?: React.ReactNode
) {
	return {
		page,
		children,
		icon,
	} as IRouterItem;
}

// id -> 中文名
export const routeNameMap = {
	home: "首页",
	ie: "调查评估",
	ic: "接收入矫",
	wait: "待入矫人员",
	crplan: "矫正方案",
	crteam: "矫正小组",
	noExit: "不准出境",
	security: "权限",
	worker: "行政人员",
};

// todo: 优化
// 1. 现在这里注册页面
const pageMap = {
	// 首页
	home: getPageItem("home", routeNameMap.home, Home),
	// 调查评估
	ie: getPageItem("ie", routeNameMap.ie, IE),
	// -- 调查评估走访信息
	// 接收入矫
	ic: getPageItem("ic", routeNameMap.ic),
	wait: getPageItem("wait", routeNameMap.wait, WaitPeople),
	crteam: getPageItem(
		"crteam",
		routeNameMap.crteam,
		CorrectionTeam
	),
	crplan: getPageItem(
		"crplan",
		routeNameMap.crplan,
		CorrectionPlan
	),
	// 不准出境
	noExit: getPageItem("noExit", routeNameMap.noExit, IE),
	security: getPageItem("security", routeNameMap.security),
	worker: getPageItem("worker", routeNameMap.worker, Worker),
};
// 2. 添加路由
const routerItems: IRouterItem[] = [
	getRouterItem(pageMap["home"], undefined, <HomeOutlined />),
	getRouterItem(pageMap["ie"], undefined, <SearchOutlined />),
	getRouterItem(
		pageMap["ic"],
		[pageMap["wait"], pageMap["crteam"], pageMap["crplan"]],
		<TeamOutlined />
	),
	getRouterItem(pageMap["noExit"], undefined, <PieChartOutlined />),
	getRouterItem(
		pageMap["security"],
		[pageMap["worker"]],
		<TeamOutlined />
	),
];

// 3. 生成路由信息
export const RouterData = routerItems.map((item) => {
	const { page, children } = item;
	if (!children) {
		return (
			<Route
				key={page.id}
				path={page.id}
				element={<page.component />}
			/>
		);
	} else {
		return children.map((p) => {
			const pathName = page.id + "/" + p.id;
			return (
				<Route
					key={pathName}
					path={pathName}
					element={<p.component />}
				/>
			);
		});
	}
});
export default routerItems;
