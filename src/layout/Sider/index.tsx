import { Menu, MenuProps } from "antd";
import Sider, { SiderTheme } from "antd/es/layout/Sider";
import MenuItem from "antd/es/menu/MenuItem";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routerItems, { routeNameMap } from "@/router/config";

interface ISiderProps {
	appTheme: SiderTheme;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		title: label
	} as MenuItem;
}

function getChildItem(
	childItem: string[],
	parentKey: React.Key
): MenuItem[] {
	return childItem.map((label) =>
		getItem(
			routeNameMap[label as keyof typeof routeNameMap],
			parentKey + "/" + label
		)
	);
}

// 根据路由信息生成导航栏
const menuItems = routerItems.map((item) => {
	if (item.children != null) {
		return getItem(
			item.page.title,
			item.page.id,
			item.icon,
			getChildItem(
				item.children.map((i) => {
					return i.id;
				}),
				item.page.id
			)
		);
	} else {
		return getItem(item.page.title, item.page.id, item.icon);
	}
});
// 设置菜单默认的选择
const findDefaultMenuItem = (pathname: string) => {
	const pathList = pathname.split("/").slice(2);
	if (pathList.length == 1) {
		return [[], pathList];
	} else {
		let full = "";
		for (let i = 0; i < pathList.length; i++) {
			if (i) full += "/";
			full += pathList[i];
		}
		return [[pathList[0]], [full]];
	}
};


export default function AppSider(props: ISiderProps) {
	const [collapsed, setCollapsed] = useState(false);
	const { appTheme } = props;

	let navigate = useNavigate();
	const { pathname } = useLocation();


	const defaultMenuItem = findDefaultMenuItem(pathname);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
			theme={appTheme}
			style={{
				overflow: "auto",
				height: "100vh",
				position: "fixed",
				left: 0,
				top: 0,
				bottom: 0
			}}
		>
			<div
				style={{
					height: 32,
					margin: "20px auto",
					color: "white",
					textAlign: "center"
				}}
			>
				<h1>社区矫正</h1>
			</div>


			<Menu
				theme={appTheme}
				defaultOpenKeys={defaultMenuItem[0]}
				defaultSelectedKeys={defaultMenuItem[1]}
				mode="inline"
				items={menuItems}
				onClick={({ key }) => {
					navigate(key);
				}}
			/>
		</Sider>
	);
}
