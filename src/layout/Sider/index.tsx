import { Menu, MenuProps, Switch } from "antd";
import Sider, { SiderTheme } from "antd/es/layout/Sider";
import MenuItem from "antd/es/menu/MenuItem";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

interface ISiderProps {
  menuItems: MenuItem[];
  appTheme: SiderTheme;
}

export default function AppSider(props: ISiderProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { menuItems, appTheme } = props;

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
      }}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme={appTheme}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={menuItems}
      />
    </Sider>
  );
}
