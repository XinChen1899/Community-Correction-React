import axios from "axios";
import { apiGet, apiPost } from "..";
import { BBInfo } from "@/entity/NoExit/BBInfo";

const api = axios.create({
	baseURL: "http://localhost:9008/noexit",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getBBForm = (
	dxbh: string,
	onSuccess: any,
	onError: any
) => {
	apiGet(api, `/bb/${dxbh}`, onSuccess, onError);
};

export const updateBBForm = (
	bbInfo: BBInfo,
	onSuccess: any,
	onError: any
) => {
	apiPost(api, "/bb/update", bbInfo, onSuccess, onError);
};

export const getExitInfoByDXBH = (
	dxbh: string,
	onSuccess: any,
	onError: any
) => {
	apiGet(api, `/info/${dxbh}`, onSuccess, onError);
};

export const getAllInfos = (onSuccess?: any, onError?: any) => {
	return apiGet(api, "/info/all", onSuccess, onError);
};
