import { message } from "antd";

export interface GMessage {
	onSuccess: any;
	onError: any;
}

export const useMessage = (): [
	GMessage,
	React.ReactElement<any, string | React.JSXElementConstructor<any>>
] => {
	const [messageApi, contextHolder] = message.useMessage();

	const successMsg = (msg: string) => {
		messageApi.open({
			type: "success",
			content: msg,
		});
	};

	const errorMsg = (msg: string) => {
		messageApi.open({
			type: "error",
			content: msg,
		});
	};
	const gMsg: GMessage = {
		onSuccess: successMsg,
		onError: errorMsg,
	};
	return [gMsg, contextHolder];
};
