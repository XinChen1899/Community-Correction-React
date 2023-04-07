import { useEffect, useState } from "react";
import axios, { AxiosInstance } from "axios";

export const apiPost = async (
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

export const apiGet = async (
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

const useRequest = (
	url: string,
	method: string,
	data: any = {},
	config: any = {}
) => {
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState(null);
	const [error, setError] = useState<Error>(new Error());

	const request = async () => {
		setLoading(true);
		try {
			const result = await axios({
				url,
				params: data,
				method,
				headers: { "Access-Control-Allow-Origin": "*" },
				...config,
			});
			if (
				result &&
				result.status >= 200 &&
				result.status <= 304
			) {
				setResult(result.data);
			} else {
				setError(new Error("get data error in index"));
			}
		} catch (reason: any) {
			setError(reason);
		}
		setLoading(false);
	};
	useEffect(() => {
		request();
	}, []);

	return {
		loading,
		result,
		error,
	};
};

export default useRequest;
