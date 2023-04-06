import { CorrectionTeam, Home, IE, WaitPeople } from "@/pages";
import { Route } from "react-router-dom";
import {
	HomeOutlined,
	SearchOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { LazyExoticComponent, lazy } from "react";

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

interface IPageItem {
	pathname: string;
	title: string;
	component: LazyExoticComponent<any>;
}

export function getPageItem(
	pathname: string,
	title: string,
	component?: LazyExoticComponent<any>
) {
	return {
		pathname,
		title,
		component,
	} as IPageItem;
}

export const routeTable = [
	{
		url: "home",
		page: getPageItem(
			"home",
			routeNameMap.home,
			lazy(() => import("@/pages/home"))
		),
		children: [],
		icon: <HomeOutlined />,
	},
	{
		url: "ie",
		page: getPageItem(
			"ie",
			routeNameMap.ie,
			lazy(() => import("@/pages/investigators-evaluated"))
		),
		children: [],
		icon: <SearchOutlined />,
	},
	{
		url: "ic",
		page: getPageItem("ic", routeNameMap.ic),
		icon: <TeamOutlined />,
		children: [
			{
				url: "ic/wait",
				page: getPageItem(
					"wait",
					routeNameMap.wait,
					lazy(() => import("@/pages/WaitPeople"))
				),
				children: [],
			},
			{
				url: "ic/crteam",
				page: getPageItem(
					"crteam",
					routeNameMap.crteam,
					lazy(() => import("@/pages/CorrectionTeam"))
				),
				children: [],
			},
			{
				url: "ic/crplan",
				page: getPageItem(
					"crplan",
					routeNameMap.crteam,
					lazy(() => import("@/pages/CorrectionPlan"))
				),
				children: [],
			},
		],
	},
];

const generateRoute = (routeTable: any[]) => {
	const routes: React.ReactElement[] = [];
	routeTable.forEach((route: any) => {
		if (route.page.component) {
			routes.push(
				<Route
					key={route.url}
					path={route.url}
					element={<route.page.component />}
				/>
			);
		} else {
			routes.push(<Route key={route.url} path={route.url} />);
		}
		if (route.children.length) {
			routes.push(...generateRoute(route.children));
		}
	});
	return routes;
};

export const Routers = generateRoute(routeTable);
