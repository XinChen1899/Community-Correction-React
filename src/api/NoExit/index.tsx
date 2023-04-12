import axios from "axios";
import { ServerTable, useAPI } from "..";
import { BBInfo } from "@/entity/NoExit/BBInfo";

const api = axios.create({
	baseURL: `${ServerTable.noexit}/noexit`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getBBForm = (
	dxbh: string,
	onSuccess: any,
	onError: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: `/bb/${dxbh}`, method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const updateBBForm = (
	bbInfo: BBInfo,
	onSuccess: any,
	onError: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: `/bb/update`, method: "post", data: bbInfo },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getExitInfoByDXBH = (
	dxbh: string,
	onSuccess: any,
	onError: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: `/info/${dxbh}`, method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getAllInfos = (
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/info/all", method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};
