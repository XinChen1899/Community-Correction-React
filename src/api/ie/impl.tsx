import { api } from ".";
import useAPI from "..";

// 模拟委托方开启一个调查评估流程
export const implWTF = () => {
	useAPI(api, { url: "/task/process", method: "post" });
};

// 模拟委托方发送调查评估委托函
export const implSend2JZJG = (onSuccess: any) => {
	useAPI(
		api,
		{
			url: "/task/jzjg",
			method: "post",
		},
		onSuccess
	);
};

export const implBack = (processId: string, onSuccess: any) => {
	useAPI(
		api,
		{
			url: `/task/recv?processId=${processId}&res=0`,
			method: "post",
		},
		onSuccess
	);
};
export const implRecv = (processId: string, onSuccess: any) => {
	useAPI(
		api,
		{
			url: `/task/recv?processId=${processId}&res=1`,
			method: "post",
		},
		onSuccess
	);
};

// export const getCount = (
// 	onSuccess?: any,
// 	onError?: any,
// 	setConfirmLoading?: any
// ) => {
// 	useAPI(
// 		api,
// 		{ url: "/count", method: "get" },
// 		onSuccess,
// 		onError,
// 		setConfirmLoading
// 	);
// };
