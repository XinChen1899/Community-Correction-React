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
  return childItem.map((label, index) =>
    getItem(label, parentKey + index.toString())
  );
}
// 导航栏
const items: MenuItem[] = [
  getItem("首页", "1", <PieChartOutlined />),
  { type: "divider" },

  getItem("调查评估", "2", <DesktopOutlined />),
  { type: "divider" },

  getItem(
    "接收入矫",
    "sub1",
    <UserOutlined />,
    getChildItem(
      [
        "交付接收",
        "入矫登记",
        "矫正小组",
        "入矫矫正方案",
        "入矫宣告",
        "逾期报到或未报到",
        "入矫矫正方案",
      ],
      "sub1"
    )
  ),
  { type: "divider" },

  getItem("不准出境", "3", <TeamOutlined />),
  { type: "divider" },

  getItem("分类管理", "4", <FileOutlined />),
  { type: "divider" },

  getItem(
    "个别化矫正",
    "sub2",
    <FileOutlined />,
    getChildItem(["矫正方案", "方案库"], "sub2")
  ),
  { type: "divider" },

  getItem(
    "日常管理",
    "sub3",
    <FileOutlined />,
    getChildItem(
      [
        "定期报到",
        "日常报告",
        "实地查访",
        "通信联络",
        "信息化核查",
        "公安情报核查",
        "脱管处置",
        "被羁押处置",
      ],
      "sub3"
    )
  ),
  { type: "divider" },

  getItem(
    "业务审批",
    "sub4",
    <FileOutlined />,
    getChildItem(
      [
        "进入特定场所审批",
        "会客",
        "外出",
        "经常性跨市县活动",
        "迁居/执行地变更",
        "病情复查延期/暂予监外执行",
        "减免考核",
      ],
      "sub4"
    )
  ),
  { type: "divider" },

  getItem(
    "考核奖惩",
    "sub5",
    <FileOutlined />,
    getChildItem(["计分考核", "奖励", "处罚"], "sub5")
  ),
  { type: "divider" },

  getItem("终止矫正", "13", <FileOutlined />),
  { type: "divider" },

  getItem(
    "解除矫正",
    "sub6",
    <FileOutlined />,
    getChildItem(["解矫办理", "解矫宣告", "特赦"], "sub6")
  ),
];

export default function AppLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [siderTheme, setSiderTheme] = useState<SiderTheme>("dark");

  const changeSiderTheme = (value: boolean) => {
    setSiderTheme(value ? "dark" : "light");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppSider menuItems={items} appTheme={siderTheme} />

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <AppHeader colorBgContainer={colorBgContainer} />

        <AppContent colorBgContainer={colorBgContainer} />

        <AppFooter />
      </Layout>
    </Layout>
  );
}
