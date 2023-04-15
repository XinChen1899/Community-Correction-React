import {
	HomeOutlined,
	SearchOutlined,
	TeamOutlined,
	DeleteRowOutlined,
	DeploymentUnitOutlined,
	SolutionOutlined,
	ApartmentOutlined,
	ScheduleOutlined,
	EyeOutlined,
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
	nocheckin: "逾期报到/未报到",

	noExit: "不准出境",
	security: "权限",
	worker: "工作人员",
	noexit: "不准出境",
	category: "分类管理",
	individual: "个别化矫正",

	daily: "日常管理",
	check: "定期报到",
	daily_function: "功能列表",

	business: "业务审批 ",

	assesment: "考核奖惩",
	score: "计分考核",
	reward: "奖励",
	punish: "惩罚",

	termination: "终止矫正",
	uncorrected: "解除矫正",
	planrepo: "方案库",
	announcement: "入矫宣告",
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
		icon: <HomeOutlined />,
	},
	{
		url: "ie",
		page: getPageItem(
			"ie",
			routeNameMap.ie,
			lazy(() => import("@/pages/InvestigatorsEvaluated"))
		),
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
			},
			{
				url: "ic/crteam",
				page: getPageItem(
					"crteam",
					routeNameMap.crteam,
					lazy(() => import("@/pages/CorrectionTeam"))
				),
			},
			{
				url: "ic/announcement",
				page: getPageItem(
					"announcement",
					routeNameMap.announcement,
					lazy(() => import("@/pages/Announcement"))
				),
			},
			{
				url: "ic/nocheckin",
				page: getPageItem(
					"nocheckin",
					routeNameMap.nocheckin,
					lazy(() => import("@/pages/NoCheckIn"))
				),
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
		icon: <DeleteRowOutlined />,
	},
	{
		url: "category",
		page: getPageItem(
			"category",
			routeNameMap.category,
			lazy(() => import("@/pages/Category"))
		),
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
			},
			{
				url: "individual/planrepo",
				page: getPageItem(
					"planrepo",
					routeNameMap.planrepo,
					lazy(() => import("@/pages/PlanRepository"))
				),
			},
		],
		icon: <SolutionOutlined />,
	},
	{
		url: "daily",
		page: getPageItem("daily", routeNameMap.daily),
		children: [
			{
				url: "daily/daily_function",
				page: getPageItem(
					"daily_function",
					routeNameMap.daily_function,
					lazy(
						() =>
							import(
								"@/pages/DailyManagement/FunctionPane"
							)
					)
				),
			},
			{
				url: "daily/check",
				page: getPageItem(
					"check",
					routeNameMap.check,
					lazy(
						() =>
							import("@/pages/DailyManagement/CheckIn")
					)
				),
			},
		],
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
		page: getPageItem("assessment", routeNameMap.assesment),
		children: [
			{
				url: "assessment/score",
				page: getPageItem(
					"score",
					routeNameMap.score,
					lazy(() => import("@/pages/Assessment/Score"))
				),
			},
			{
				url: "assessment/reward",
				page: getPageItem(
					"reward",
					routeNameMap.reward,
					lazy(() => import("@/pages/Assessment/Reward"))
				),
			},
			{
				url: "assessment/punish",
				page: getPageItem(
					"punish",
					routeNameMap.punish,
					lazy(
						() => import("@/pages/Assessment/Punishment")
					)
				),
			},
		],
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
			},
		],
		icon: <SearchOutlined />,
	},
];
