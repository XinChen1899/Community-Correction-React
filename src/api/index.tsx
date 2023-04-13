import { AxiosInstance } from "axios";
import { useEffect } from "react";

export const ServerTable = {
	ie: "http://localhost:9006",
	ic: "http://localhost:9007",
	noexit: "http://localhost:9008",
	cate: "http://localhost:9009",
	daily: "http://localhost:9010",
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
