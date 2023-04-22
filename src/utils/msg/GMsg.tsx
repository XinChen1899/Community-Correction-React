import { message } from "antd";

export interface GMessage {
	onSuccess: any;
	onError: any;
	onInfo?: any;
	onWarning?: any;
	onLoading?: any;
}

export const useMessage = (): [
	GMessage,
	React.ReactElement<any, string | React.JSXElementConstructor<any>>
] => {
	const [messageApi, contextHolder] = message.useMessage();

	const onSuccess = (msg: string) => messageApi.success(msg);
	const onError = (msg: string) => messageApi.error(msg);
	const onWarning = (msg: string) => messageApi.warning(msg);
	const onInfo = (msg: string) => messageApi.info(msg);
	const onLoading = (msg: string) => messageApi.loading(msg);

	const gMsg: GMessage = {
		onSuccess,
		onError,
		onInfo,
		onWarning,
		onLoading,
	};
	return [gMsg, contextHolder];
};
