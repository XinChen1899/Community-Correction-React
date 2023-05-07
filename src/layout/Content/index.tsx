import { Home } from "@/pages";
import { RouteItem, routeTable } from "@/router/routerTable";
import { Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IContenterProps {
	colorBgContainer: string;
	children: JSX.Element;
	history: any;
	setHistory: any;
}

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const getComponentByPathname = (
	pathname: string
): { r: React.ReactNode; title: string } => {
	let res: { r: ReactNode; title: string } = {
		r: <Home />,
		title: "home",
	};
	const _getByPath = (route: RouteItem[], pathname: string) => {
		route.forEach((item) => {
			if (item.children) {
				_getByPath(item.children, pathname);
			} else {
				if ("/" + item.url == pathname) {
					res = {
						r: item.page._comp,
						title: item.page.title,
					};
				}
			}
		});
	};
	_getByPath(routeTable, pathname);
	return res;
};

const existPath = (history: any[], pathname: string) => {
	if (history.length == 0) return true;
	for (let i = 0; i < history.length; i++) {
		if (history[i].pathname == pathname) return false;
	}
	return true;
};
const getPathKey = (history: any[], pathname: string) => {
	for (let i = 0; i < history.length; i++) {
		if (history[i].pathname == pathname) return history[i].key;
	}
};
function AppContent(props: IContenterProps) {
	const { history, setHistory } = props;

	const location = useLocation();

	useEffect(() => {
		// console.log(location.pathname, history);
		if (existPath(history, location.pathname)) {
			const key = `${location.pathname}${history.length + 1}`;
			const { r, title } = getComponentByPathname(
				location.pathname
			);
			const current = {
				pathname: location.pathname,
				component: r,
				key,
				title,
			};
			setHistory([...history, current]);
			add(current);
			setActiveKey(String(key));
		} else {
			// console.log(location.pathname + "已存在");
			const key = getPathKey(history, location.pathname);
			setActiveKey(String(key));
		}
	}, [location.pathname]);

	const [activeKey, setActiveKey] = useState("");
	const [items, setItems] = useState<any[]>([]);
	const navigate = useNavigate();
	const onChange = (key: string) => {
		const kk = key.slice(1, key.length - 1);
		// console.log("====" + kk);
		setActiveKey(key);
		navigate(kk);
	};

	const add = (current: any) => {
		setItems([
			...items,
			{
				label: current.title,
				children: current.component,
				key: current.key,
			},
		]);
		setActiveKey(current.key);
	};

	const remove = (targetKey: TargetKey) => {
		const targetIndex = items.findIndex(
			(pane) => pane.key === targetKey
		);
		const newPanes = items.filter(
			(pane) => pane.key !== targetKey
		);
		const newHistory = history.filter(
			(item: any) => item.key != targetKey
		);
		if (newPanes.length && targetKey === activeKey) {
			const { key } =
				newPanes[
					targetIndex === newPanes.length
						? targetIndex - 1
						: targetIndex
				];
			setActiveKey(key);
		}
		setItems(newPanes);
		setHistory(newHistory);
	};

	const onEdit = (
		targetKey: TargetKey,
		action: "add" | "remove"
	) => {
		if (action === "add") {
			// const cur = history[history.length - 1];
			// add(cur.component, cur.key);
		} else {
			remove(targetKey);
		}
	};

	return (
		<Content style={{ margin: "0 16px" }}>
			<Tabs
				hideAdd
				onChange={onChange}
				activeKey={activeKey}
				type="editable-card"
				onEdit={onEdit}
				items={items}
			/>
		</Content>
	);
}

export default AppContent;
