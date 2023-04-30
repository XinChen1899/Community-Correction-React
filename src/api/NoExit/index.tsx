import { BBInfo } from "@/entity/NoExit/BBInfo";
import { ZJInfo } from "@/entity/NoExit/ZJInfo";
import { getDate } from "@/utils/ie";
import axios from "axios";
import { useAPI } from "..";

export const api = axios.create({
	baseURL: "/api/noexit",
	headers: { "Access-Control-Allow-Origin": "*" },
});

const convert2BBForm = (info: BBInfo): BBInfo => {
	info.bbrq = getDate(info.bbrq);
	info.bbjsrq = getDate(info.bbjsrq);
	info.bbksrq = getDate(info.bbksrq);
	return info;
};

export const getBBInfo = (dxbh: string) => {
	return api.get(`/bb/${dxbh}`);
};

export const getZJInfo = (dxbh: string) => {
	return api.get(`/zj/${dxbh}`);
};

export const updateBBInfo = (bbInfo: BBInfo) => {
	bbInfo = convert2BBForm(bbInfo);
	return api.post("/bb/update", bbInfo);
};

export const updateZJInfo = (info: ZJInfo) => {
	return api.post("/zj/update", info);
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

export const getAllExitInfos = () => {
	return api.get("/info/all");
};

export const implBBInfoAccept = (info: BBInfo) => {
	info = convert2BBForm(info);
	return api.post("/bb/task/accept", info);
};

export const implZJInfoAccept = (info: ZJInfo) => {
	return api.post("/zj/task/accept", info);
};
