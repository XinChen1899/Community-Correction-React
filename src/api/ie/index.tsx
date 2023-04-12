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

export const updateIEInfoData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/update", method: "post", data: data },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getAllIEInfos = (
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/all", method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
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

export const getSuggestInfoById = (
	id: string,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: `suggest/${id}`, method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const updateSuggestInfoData = (
	data: { wtbh: string; yjs: string },
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/suggest/update", method: "post", data: data },
		onSuccess,
		onError,
		setConfirmLoading
	);
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
