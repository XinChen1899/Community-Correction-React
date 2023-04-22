import { AxiosInstance } from "axios";
// todo yaml配置
export const ServerTable = {
	ie: "http://localhost:9006",
	ic: "http://localhost:9007",
	noexit: "http://localhost:9008",
	cate: "http://localhost:9009",
	daily: "http://localhost:9010",
	assessment: "http://localhost:9011",
	business: "http://localhost:9012",
	termination: "http://localhost:9013",
	uncorrected: "http://localhost:9014",
};

export const useAPI = (
	api: AxiosInstance,
	config: { url: string; method: string; data?: any },
	onSuccess?: any,
	onError?: any,
	setConfimLoading?: any
) => {
	const { url, method, data } = config;
	if (method.toLowerCase() == "get") {
		apiGet(api, url, onSuccess, onError, setConfimLoading);
	} else if (method.toLowerCase() == "post") {
		apiPost(api, url, data, onSuccess, onError, setConfimLoading);
	}
};

const apiPost = async (
	api: AxiosInstance,
	url: string,
	data: any,
	onSuccess?: any,
	onError?: any,
	setConfimLoading?: any
) => {
	if (setConfimLoading) setConfimLoading(true);
	await api
		.post(url, data)
		.then(({ data }) => {
			console.log(`post url: ${url}: response `, data);
			if (data.status == "200" || data != false || data) {
				if (onSuccess) onSuccess(data.data);
			} else {
				if (onError) onError(data.message);
			}
		})
		.catch((reason) => {
			if (onError) onError(reason.message);
		})
		.finally(() => {
			if (setConfimLoading) setConfimLoading(false);
		});
};

const apiGet = async (
	api: AxiosInstance,
	url: string,
	onSuccess?: any,
	onError?: any,
	setConfimLoading?: any
) => {
	if (setConfimLoading) setConfimLoading(true);
	await api
		.get(url)
		.then(({ data }) => {
			console.log(`get url: ${url}: response`, data);
			if (data.status == "200") {
				onSuccess(data.data);
			} else {
				onError(data.message);
			}
		})
		.catch((reason) => {
			onError(reason.message);
		})
		.finally(() => {
			if (setConfimLoading) setConfimLoading(false);
		});
};

export default useAPI;
