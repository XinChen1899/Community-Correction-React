import { routeTable } from "@/router/routerTable";
import { Menu, MenuProps } from "antd";
import Sider, { SiderTheme } from "antd/es/layout/Sider";
import MenuItem from "antd/es/menu/MenuItem";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
		title: label,
	} as MenuItem;
}

const generateMenu = (routeTable: any[]) => {
	const menus: MenuItem[] = [];
	routeTable.forEach((route: any) => {
		const menuChildren: MenuItem[] = [];
		if (route.children.length) {
			menuChildren.push(...generateMenu(route.children));
			menus.push(
				getItem(
					route.page.title,
					route.url,
					route.icon,
					menuChildren
				)
			);
		} else {
			menus.push(
				getItem(route.page.title, route.url, route.icon)
			);
		}
	});
	return menus;
};

export const menuItems = generateMenu(routeTable);

// 设置菜单默认的选择
const findDefaultMenuItem = (pathname: string) => {
	const pathList = pathname.split("/").slice(1);

	if (pathList.length == 1) {
		return [[], [pathList[0]]];
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
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const defaultMenuItem = findDefaultMenuItem(pathname);

	useEffect(() => {
		const menus = findDefaultMenuItem(pathname);
		// setOpenKeys(menus[0]);
		// setSelectedKeys(menus[1]);
		// console.log(selectedKeys);
	}, [pathname]);

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
				bottom: 0,
			}}>
			<div
				style={{
					height: 32,
					margin: "20px auto",
					color: "black",
					textAlign: "center",
				}}>
				<h1>社区矫正监督管理子系统</h1>
			</div>

			<Menu
				theme={appTheme}
				defaultOpenKeys={defaultMenuItem[0]}
				defaultSelectedKeys={defaultMenuItem[1]}
				mode="inline"
				items={menuItems}
				onClick={(d) => {
					navigate(d.key);
				}}
			/>
		</Sider>
	);
}
