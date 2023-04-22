import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";

export type NotificationType =
	| "success"
	| "info"
	| "warning"
	| "error";

const TemplateNotification = (props: {
	message: string;
	description: any;
	runCondition?: boolean;
}) => {
	const { message, description, runCondition } = props;
	const [api, contextHolder] = notification.useNotification();

	const openNotification = () => {
		api.open({
			message,
			description,
			icon: <SmileOutlined style={{ color: "#108ee9" }} />,
		});
	};

	return (
		<>
			{contextHolder}
			<Button type="primary" onClick={openNotification}>
				点我
			</Button>
		</>
	);
};

export default TemplateNotification;

export const useMyNotification = (
	message: string,
	description: any,
	icon?: any
): [any, () => void] => {
	const [api, notifyContext] = notification.useNotification();

	const openNotification = () => {
		api.open({
			message,
			description,
			icon: <SmileOutlined style={{ color: "#108ee9" }} />,
		});
	};
	return [notifyContext, openNotification];
};
