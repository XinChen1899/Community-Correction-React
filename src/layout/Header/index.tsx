import { Header } from "antd/es/layout/layout";

interface IHeaderProps {
  colorBgContainer: string;
}

export default function AppHeader(props: IHeaderProps) {
  const { colorBgContainer } = props;

  return <Header style={{ padding: 0, background: colorBgContainer }} />;
}
