import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import { Routes } from "react-router-dom";
import { RouterData } from "@/router/config";

interface IContenterProps {
  colorBgContainer: string;
}

function AppContent(props: IContenterProps) {
  // const { colorBgContainer } = props;

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <Routes>{RouterData}</Routes>
    </Content>
  );
}

export default AppContent;
