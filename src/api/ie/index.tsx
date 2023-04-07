import { IEInfo } from "@/entity/IE/IEInfo";
import axios from "axios";
import { apiGet, apiPost } from "..";

const api = axios.create({
	baseURL: "http://localhost:9006/ie",
	headers: { "Access-Control-Allow-Origin": "*" },
});

// export const saveIEInfoData = async (data: IEInfo) => {
// 	const result = await api.post("/save", data);
// 	console.log(result);
// };

export const saveIEInfoData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any
) => {
	apiPost(api, "/save", data, onSuccess, onError);
};

// export const updateIEInfoData = async (data: IEInfo) => {
// 	const result = await api.post("/update", data);
// 	console.log(result);
// };

export const updateIEInfoData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any
) => {
	apiPost(api, "/update", data, onSuccess, onError);
};

// export const getAll = async (callback1: any, callback2: any) => {
// 	const data = await axios.get("/all").then(({ data }) => data);
// 	return callback2(callback1(data));
// };

export const getAllIEInfos = (onSuccess?: any, onError?: any) => {
	return apiGet(api, "/all", onSuccess, onError);
};

// export const getCount = async (callback: any) => {
// 	const data = await axios.get("/count").then(({ data }) => data);
// 	return callback(data);
// };

export const getCount = (onSuccess?: any, onError?: any) => {
	return apiGet(api, "/count", onSuccess, onError);
};

// export const getById = async (id: string) => {
// 	const data = await axios.get(`/${id}`).then(({ data }) => data);
// 	return data;
// };

export const getIEInfoById = (
	id: string,
	onSuccess?: any,
	onError?: any
) => {
	return apiGet(api, id, onSuccess, onError);
};
