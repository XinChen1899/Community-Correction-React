import { Route } from "react-router-dom";
import {
	ApartmentOutlined,
	DeleteRowOutlined,
	DeploymentUnitOutlined,
	EyeOutlined,
	HomeOutlined,
	ScheduleOutlined,
	SearchOutlined,
	SolutionOutlined,
	TeamOutlined,
	UsergroupDeleteOutlined,
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
	worker: "工作人员",
	noexit: "不准出境",
	category: "分类管理",
	individual: "个别化矫正",
	daily: "日常管理",
	business: "业务审批 ",
	assesment: "考核奖惩",
	termination: "终止矫正",
	uncorrected: "解除矫正",
	planrepo: "方案库",
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
			lazy(() => import("@/pages/Home"))
		),
		children: [],
		icon: <HomeOutlined />,
	},
	{
		url: "ie",
		page: getPageItem(
			"ie",
			routeNameMap.ie,
			lazy(() => import("@/pages/InvestigatorsEvaluated"))
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
		],
	},
	{
		url: "noexit",
		page: getPageItem(
			"noexit",
			routeNameMap.noexit,
			lazy(() => import("@/pages/NoExit"))
		),
		children: [],
		icon: <DeleteRowOutlined />,
	},
	{
		url: "category",
		page: getPageItem(
			"category",
			routeNameMap.category,
			lazy(() => import("@/pages/Category"))
		),
		children: [],
		icon: <DeploymentUnitOutlined />,
	},
	{
		url: "individual",
		page: getPageItem(
			"individual",
			routeNameMap.individual,
			lazy(() => import("@/pages/IndividualCorrection"))
		),
		children: [
			{
				url: "individual/crplan",
				page: getPageItem(
					"crplan",
					routeNameMap.crplan,
					lazy(() => import("@/pages/CorrectionPlan"))
				),
				children: [],
			},
			{
				url: "individual/planrepo",
				page: getPageItem(
					"planrepo",
					routeNameMap.planrepo,
					lazy(() => import("@/pages/PlanRepository"))
				),
				children: [],
			},
		],
		icon: <SolutionOutlined />,
	},
	{
		url: "daily",
		page: getPageItem(
			"daily",
			routeNameMap.daily,
			lazy(() => import("@/pages/DailyManagement"))
		),
		children: [],
		icon: <ApartmentOutlined />,
	},
	{
		url: "business",
		page: getPageItem(
			"business",
			routeNameMap.business,
			lazy(() => import("@/pages/BusinessApproval"))
		),
		children: [],
		icon: <ScheduleOutlined />,
	},
	{
		url: "assessment",
		page: getPageItem(
			"assessment",
			routeNameMap.assesment,
			lazy(() => import("@/pages/BusinessApproval"))
		),
		children: [],
		icon: <EyeOutlined />,
	},
	{
		url: "termination",
		page: getPageItem(
			"termination",
			routeNameMap.termination,
			lazy(() => import("@/pages/TerminationCorrection"))
		),
		children: [],
		icon: <UsergroupDeleteOutlined />,
	},
	{
		url: "uncorrected",
		page: getPageItem(
			"uncorrected",
			routeNameMap.uncorrected,
			lazy(() => import("@/pages/UnCorrected"))
		),
		children: [],
		icon: <UsergroupDeleteOutlined />,
	},
	{
		url: "security",
		page: getPageItem("security", routeNameMap.security),
		children: [
			{
				url: "security/worker",
				page: getPageItem(
					"worker",
					routeNameMap.worker,
					lazy(() => import("@/pages/Woker"))
				),
				children: [],
			},
		],
		icon: <SearchOutlined />,
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
