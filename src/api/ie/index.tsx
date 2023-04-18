import { IEInfo } from "@/entity/IE/IEInfo";
import axios from "axios";
import { ServerTable, useAPI } from "..";
import { SuggestInfo } from "@/entity/IE/SuggestInfo";

const api = axios.create({
	baseURL: `${ServerTable.ie}/ie`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const saveIEInfoData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/save", method: "post", data: data },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const updateIEInfo = (data: IEInfo) => {
	return api.post("/update", data);
};

export const getAllIEInfos = () => {
	return api.get("/all");
};

export const getCount = (
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/count", method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getIEInfoById = (
	id: string,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: `/${id}`, method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getSuggestInfoById = (id: string) => {
	return api.get(`/suggest/${id}`);
};

export const updateSuggestInfoData = (data: SuggestInfo) => {
	return api.post("/suggest/update", data);
};

export const updateIEInfoTimeData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/update/time", method: "post", data: data },
		onSuccess,
		onError,
		setConfirmLoading
	);
};
