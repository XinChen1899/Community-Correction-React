import {
	Announcement,
	AssessmentScore,
	BanOrder,
	BusFunctionPane,
	CategoryManagement,
	CorrectionPlan,
	CorrectionTeam,
	Home,
	IE,
	NoCheckIn,
	NoExit,
	Punishment,
	Reward,
	UnCorrected,
	WaitPeople,
} from "@/pages";
import { VisitorApproval } from "@/pages/BusinessApproval";
import {
	CheckIn,
	DailyReport,
	FunctionPane,
} from "@/pages/DailyManagement";
import {
	TermAnnouncement,
	TerminationCorrectionHandle,
} from "@/pages/TerminationCorrection";
import { UncorrectedAnnouncement } from "@/pages/UnCorrected";
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
import React, { LazyExoticComponent, lazy } from "react";

// id -> 中文名
export const routeNameMap = {
	home: "首页",

	ie: "调查评估",

	ic: "接收入矫",
	wait: "待入矫人员",
	crteam: "矫正小组",
	announcement: "入矫宣告",
	nocheckin: "逾期报到/未报到",

	noExit: "不准出境",

	security: "权限",
	worker: "工作人员",

	noexit: "不准出境",
	category: "分类管理",

	individual: "个别化矫正",
	crplan: "矫正方案",
	planrepo: "方案库",

	daily: "日常管理",
	check: "定期报到",
	report: "日常报告",
	daily_function: "功能列表",

	business: "业务审批",
	ban: "禁止令",
	visitor: "会客审批",

	assesment: "考核奖惩",
	score: "计分考核",
	reward: "奖励",
	punish: "惩罚",

	termination: "终止矫正",
	termhandle: "终止矫正办理",
	termannounce: "终止矫正宣告",

	uncorrected: "解除矫正",
	uchandle: "解除矫正办理",
	ucannounce: "解除矫正宣告",
};

interface IPageItem {
	pathname: string;
	title: string;
	component: LazyExoticComponent<any>;
	_comp?: React.ReactNode;
}

export function getPageItem(
	pathname: string,
	title: string,
	component?: LazyExoticComponent<any>,
	_comp?: React.ReactNode
) {
	return {
		pathname,
		title,
		component,
		_comp,
	} as IPageItem;
}

export interface RouteItem {
	url: string;
	page: IPageItem;
	icon?: JSX.Element;
	children?: RouteItem[];
}

export const routeTable: RouteItem[] = [
	{
		url: "home",
		page: getPageItem(
			"home",
			routeNameMap.home,
			lazy(() => import("@/pages/Home")),
			<Home />
		),
		icon: <HomeOutlined />,
	},
	{
		url: "ie",
		page: getPageItem(
			"ie",
			routeNameMap.ie,
			lazy(() => import("@/pages/InvestigatorsEvaluated")),
			<IE />
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
					lazy(
						() =>
							import(
								"@/pages/RecvCorrection/WaitPeople"
							)
					),
					<WaitPeople />
				),
			},
			{
				url: "ic/crteam",
				page: getPageItem(
					"crteam",
					routeNameMap.crteam,
					lazy(
						() =>
							import(
								"@/pages/RecvCorrection/CorrectionTeam"
							)
					),
					<CorrectionTeam />
				),
			},
			{
				url: "ic/announcement",
				page: getPageItem(
					"announcement",
					routeNameMap.announcement,
					lazy(
						() =>
							import(
								"@/pages/RecvCorrection/Announcement"
							)
					),
					<Announcement />
				),
			},
			{
				url: "ic/nocheckin",
				page: getPageItem(
					"nocheckin",
					routeNameMap.nocheckin,
					lazy(
						() =>
							import("@/pages/RecvCorrection/NoCheckIn")
					),
					<NoCheckIn />
				),
			},
		],
	},
	{
		url: "noexit",
		page: getPageItem(
			"noexit",
			routeNameMap.noexit,
			lazy(() => import("@/pages/NoExit")),
			<NoExit />
		),
		icon: <DeleteRowOutlined />,
	},
	{
		url: "category",
		page: getPageItem(
			"category",
			routeNameMap.category,
			lazy(() => import("@/pages/Category")),
			<CategoryManagement />
		),
		icon: <DeploymentUnitOutlined />,
	},
	{
		url: "individual",
		page: getPageItem("individual", routeNameMap.individual),
		children: [
			{
				url: "individual/crplan",
				page: getPageItem(
					"crplan",
					routeNameMap.crplan,
					lazy(
						() =>
							import(
								"@/pages/IndividualCorrection/CorrectionPlan"
							)
					),
					<CorrectionPlan />
				),
			},
			{
				url: "individual/planrepo",
				page: getPageItem(
					"planrepo",
					routeNameMap.planrepo,
					lazy(
						() =>
							import(
								"@/pages/IndividualCorrection/PlanRepository"
							)
					)
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
					),
					<FunctionPane />
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
					),
					<CheckIn />
				),
			},
			{
				url: "daily/report",
				page: getPageItem(
					"report",
					routeNameMap.report,
					lazy(
						() =>
							import(
								"@/pages/DailyManagement/DailyReport"
							)
					),
					<DailyReport />
				),
			},
		],
		icon: <ApartmentOutlined />,
	},
	{
		url: "business",
		page: getPageItem("business", routeNameMap.business),
		children: [
			{
				url: "business/bus_function",
				page: getPageItem(
					"daily_function",
					routeNameMap.daily_function,
					lazy(
						() =>
							import(
								"@/pages/BusinessApproval/FunctionPane"
							)
					),
					<BusFunctionPane />
				),
			},
			{
				url: "business/ban",
				page: getPageItem(
					"ban",
					routeNameMap.ban,
					lazy(
						() =>
							import(
								"@/pages/BusinessApproval/BanOrder"
							)
					),
					<BanOrder />
				),
			},
			{
				url: "business/visitor",
				page: getPageItem(
					"visitor",
					routeNameMap.visitor,
					lazy(
						() =>
							import("@/pages/BusinessApproval/Visitor")
					),
					<VisitorApproval />
				),
			},
		],
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
					lazy(() => import("@/pages/Assessment/Score")),
					<AssessmentScore />
				),
			},
			{
				url: "assessment/reward",
				page: getPageItem(
					"reward",
					routeNameMap.reward,
					lazy(() => import("@/pages/Assessment/Reward")),
					<Reward />
				),
			},
			{
				url: "assessment/punish",
				page: getPageItem(
					"punish",
					routeNameMap.punish,
					lazy(
						() => import("@/pages/Assessment/Punishment")
					),
					<Punishment />
				),
			},
		],
		icon: <EyeOutlined />,
	},
	{
		url: "termination",
		page: getPageItem("termination", routeNameMap.termination),
		children: [
			{
				url: "term/handle",
				page: getPageItem(
					"termhandle",
					routeNameMap.termhandle,
					lazy(
						() =>
							import(
								"@/pages/TerminationCorrection/Handle"
							)
					),
					<TerminationCorrectionHandle />
				),
			},
			{
				url: "term/announce",
				page: getPageItem(
					"termannounce",
					routeNameMap.termannounce,
					lazy(
						() =>
							import(
								"@/pages/TerminationCorrection/Announcement"
							)
					),
					<TermAnnouncement />
				),
			},
		],
		icon: <UsergroupDeleteOutlined />,
	},
	{
		url: "uncorrected",
		page: getPageItem("uncorrected", routeNameMap.uncorrected),
		children: [
			{
				url: "uc/handle",
				page: getPageItem(
					"uchandle",
					routeNameMap.uchandle,
					lazy(() => import("@/pages/UnCorrected/Handle")),
					<UnCorrected />
				),
			},
			{
				url: "uc/announce",
				page: getPageItem(
					"ucannounce",
					routeNameMap.ucannounce,
					lazy(
						() =>
							import("@/pages/UnCorrected/Announcement")
					),
					<UncorrectedAnnouncement />
				),
			},
		],
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
