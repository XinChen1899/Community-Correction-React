import { IEInfo } from "@/entity/IE/IEInfo";
import axios from "axios";
import { ServerTable, useAPI } from "..";

const api = axios.create({
	baseURL: `${ServerTable.ie}/ie`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const saveIEInfoData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/save", method: "post", data: data },
		onSuccess,
		onError
	);
};

export const updateIEInfoData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/update", method: "post", data: data },
		onSuccess,
		onError
	);
};

export const getAllIEInfos = (onSuccess?: any, onError?: any) => {
	useAPI(api, { url: "/all", method: "get" }, onSuccess, onError);
};

export const getCount = (onSuccess?: any, onError?: any) => {
	useAPI(api, { url: "/count", method: "get" }, onSuccess, onError);
};

export const getIEInfoById = (
	id: string,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(api, { url: `/${id}`, method: "get" }, onSuccess, onError);
};
