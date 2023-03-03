import {
	Home,
	Investigatorsevaluated,
	CorrectionTeam,
	CorrectionPlan
} from "@/pages";
import { Route } from "react-router-dom";
import {
	HomeOutlined,
	PieChartOutlined,
	SearchOutlined
} from "@ant-design/icons";
interface IPageItem {
	id: string;
	title: string;
	component: () => JSX.Element;
}

interface IRouterItem {
	page: IPageItem;
	children?: IPageItem[];
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
		component
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
		icon
	} as IRouterItem;
}

// id -> 中文名
export const routeNameMap = {
	home: "首页",
	investigatorSevaluated: "调查评估",
	incomeCorrection: "接受入矫",
	correctionPlan: "矫正方案",
	correctionTeam: "矫正小组",
	noExit: "不准出境"
};

// todo: 优化
const pageMap = {
	// 首页
	home: getPageItem("home", routeNameMap.home, Home),
	// 调查评估
	investigatorSevaluated: getPageItem(
		"investigatorSevaluated",
		routeNameMap.investigatorSevaluated,
		Investigatorsevaluated
	),
	// 接收入矫
	incomeCorrection: getPageItem(
		"incomeCorrection",
		routeNameMap.incomeCorrection
	),
	// --矫正方案
	correctionPlan: getPageItem(
		"correctionPlan",
		routeNameMap.incomeCorrection,
		CorrectionPlan
	),
	// --矫正小组
	correctionTeam: getPageItem(
		"correctionTeam",
		routeNameMap.incomeCorrection,
		CorrectionTeam
	),
	// 不准出境
	noExit: getPageItem(
		"noExit",
		routeNameMap.noExit,
		Investigatorsevaluated
	)

	//    "classify":        getPageItem("classify", "分类管理", Investigatorsevaluated),
	//    "home1":        getPageItem("home1", "个别化矫正", Home),
	//    "home2":        getPageItem("home2", "日常管理", Investigatorsevaluated),
	//    "home3":        getPageItem("home3", "业务审批", Home),
	//    "home4":        getPageItem("home4", "考核奖惩", Home),
	//    "home5":       getPageItem("home5", "解除矫正", Home),
	//    "home6":       getPageItem("home6", "终止矫正", Home),
	//    "recv/plan": getPageItem("plan", "矫正方案", Plan),
};

const routerItems: IRouterItem[] = [
	getRouterItem(pageMap["home"], undefined, <HomeOutlined />),
	getRouterItem(
		pageMap["investigatorSevaluated"],
		undefined,
		<SearchOutlined />
	),
	getRouterItem(
		pageMap["incomeCorrection"],
		[pageMap["correctionPlan"], pageMap["correctionTeam"]],
		<PieChartOutlined />
	),
	getRouterItem(pageMap["noExit"], undefined, <PieChartOutlined />)
	// getRouterItem("home", "首页", Home, []),
	// getRouterItem("se", "调查评估", SearchEvalute, []),
	// getRouterItem("recv", "接收入矫", SearchEvalute, []),
	// getRouterItem("no", "不准出境", SearchEvalute, []),
	// getRouterItem("classify", "分类管理", SearchEvalute, []),
	// getRouterItem("classify", "个别化矫正", SearchEvalute, []),
	// getRouterItem("classify", "日常管理", SearchEvalute, []),
	// getRouterItem("classify", "业务审批", SearchEvalute, []),
	// getRouterItem("classify", "考核奖惩", SearchEvalute, []),
	// getRouterItem("classify", "解除矫正", SearchEvalute, []),
	// getRouterItem("classify", "终止矫正", SearchEvalute, []),
];

// 生成路由
export const RouterData = routerItems.map(item => {
	const { page, children } = item;
	if (children == null) {
		return (
			<Route
				key={page.id}
				path={page.id}
				element={<page.component />}
			/>
		);
	} else {
		return children.map(p => {
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

// const items: MenuItem[] = [
//     getItem(
//       "接收入矫",
//       "sub1",
//       <UserOutlined />,
//       getChildItem(
//         [
//           "交付接收",
//           "入矫登记",
//           "矫正小组",
//           "入矫矫正方案",
//           "入矫宣告",
//           "逾期报到或未报到",
//         ],
//         "sub1"
//       )
//     ),
//     { type: "divider" },

//     getItem(
//       "个别化矫正",
//       "sub2",
//       <FileOutlined />,
//       getChildItem(["矫正方案", "方案库"], "sub2")
//     ),
//     { type: "divider" },

//     getItem(
//       "日常管理",
//       "sub3",
//       <FileOutlined />,
//       getChildItem(
//         [
//           "定期报到",
//           "日常报告",
//           "实地查访",
//           "通信联络",
//           "信息化核查",
//           "公安情报核查",
//           "脱管处置",
//           "被羁押处置",
//         ],
//         "sub3"
//       )
//     ),
//     { type: "divider" },

//     getItem(
//       "业务审批",
//       "sub4",
//       <FileOutlined />,
//       getChildItem(
//         [
//           "进入特定场所审批",
//           "会客",
//           "外出",
//           "经常性跨市县活动",
//           "迁居/执行地变更",
//           "病情复查延期/暂予监外执行",
//           "减免考核",
//         ],
//         "sub4"
//       )
//     ),
//     { type: "divider" },

//     getItem(
//       "考核奖惩",
//       "sub5",
//       <FileOutlined />,
//       getChildItem(["计分考核", "奖励", "处罚"], "sub5")
//     ),
//     { type: "divider" },

//     getItem("终止矫正", "13", <FileOutlined />),
//     { type: "divider" },

//     getItem(
//       "解除矫正",
//       "sub6",
//       <FileOutlined />,
//       getChildItem(["解矫办理", "解矫宣告", "特赦"], "sub6")
//     ),
//   ];

export default routerItems;
