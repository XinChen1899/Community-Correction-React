import { BBInfo } from "@/entity/NoExit/BBInfo";
import { getDate } from "@/utils/ie";
import axios from "axios";
import { useAPI } from "..";

export const api = axios.create({
	baseURL: "/noexit/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});

const convert2BBForm = (info: BBInfo): BBInfo => {
	info.bbrq = getDate(info.bbrq);
	info.bbjsrq = getDate(info.bbjsrq);
	info.bbksrq = getDate(info.bbksrq);
	return info;
};

export const getBBForm = (dxbh: string) => {
	return api.get(`/bb/${dxbh}`);
};

export const updateBBForm = (bbInfo: BBInfo) => {
	bbInfo = convert2BBForm(bbInfo);
	return api.post("/bb/update", bbInfo);
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

export const implAccept = (info: BBInfo) => {
	info = convert2BBForm(info);
	return api.post("/bb/task/accept", info);
};
