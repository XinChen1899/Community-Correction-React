import { notification } from "antd";
import { useEffect } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

const TemplateNotification = (props: {
	message: string;
	description: any;
	runCondition: boolean;
}) => {
	const { message, description, runCondition } = props;
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type: NotificationType) => {
		api[type]({
			message,
			description,
		});
	};
	useEffect(() => {
		if (runCondition) openNotificationWithIcon("success");
	}, [runCondition]);

	return <>{contextHolder}</>;
};

export default TemplateNotification;
