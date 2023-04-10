import { AxiosInstance } from "axios";

export const ServerTable = {
	ie: "http://localhost:9006",
	ic: "http://localhost:9007",
	noexit: "http://localhost:9008",
};

export const useAPI = (
	api: AxiosInstance,
	config: { url: string; method: string; data?: any },
	onSuccess?: any,
	onError?: any
) => {
	const { url, method, data } = config;
	if (method.toLowerCase() == "get") {
		apiGet(api, url, onSuccess, onError);
	} else if (method.toLowerCase() == "post") {
		apiPost(api, url, data, onSuccess, onError);
	}
};

const apiPost = async (
	api: AxiosInstance,
	url: string,
	data: any,
	onSuccess?: any,
	onError?: any
) => {
	await api
		.post(url, data)
		.then(({ data }) => {
			console.log(data);
			if (data.status == "200") {
				onSuccess(data.data);
			} else {
				onError(data.message);
			}
		})
		.catch((reason) => {
			onError(reason.message);
		});
};

const apiGet = async (
	api: AxiosInstance,
	url: string,
	onSuccess?: any,
	onError?: any
) => {
	await api
		.get(url)
		.then(({ data }) => {
			console.log(data);
			if (data.status == "200") {
				onSuccess(data.data);
			} else {
				onError(data.message);
			}
		})
		.catch((reason) => {
			onError(reason.message);
		});
};

export default useAPI;
