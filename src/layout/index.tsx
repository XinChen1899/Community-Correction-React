import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps, Switch } from "antd";
import { Layout, theme } from "antd";
import { SiderTheme } from "antd/es/layout/Sider";
import { useState } from "react";

import AppContent from "./Content";
import AppFooter from "./Footer";
import AppHeader from "./Header";
import AppSider from "./Sider";

type MenuItem = Required<MenuProps>["items"][number];

import routerItems, { routeNameMap } from "@/router/config";
import { BrowserRouter } from "react-router-dom";

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

function getChildItem(childItem: string[], parentKey: React.Key): MenuItem[] {
  return childItem.map((label) =>
    getItem(
      routeNameMap[label as keyof typeof routeNameMap],
      parentKey + "/" + label
    )
  );
}

// 根据路由信息生成导航栏
const nitems = routerItems.map((item) => {
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
// 导航栏

export default function AppLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [siderTheme, setSiderTheme] = useState<SiderTheme>("dark");

  const changeSiderTheme = (value: boolean) => {
    setSiderTheme(value ? "dark" : "light");
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <AppSider menuItems={nitems} appTheme={siderTheme} />

        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <AppHeader colorBgContainer={colorBgContainer} />

          <AppContent colorBgContainer={colorBgContainer} />

          <AppFooter />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
