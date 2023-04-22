import { IEInfo } from "@/entity/IE/IEInfo";
import { SuggestInfo } from "@/entity/IE/SuggestInfo";
import axios from "axios";
import { useAPI } from "..";

export const api = axios.create({
	baseURL: "/ie/api",
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

export const finishIE = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/finish", method: "post", data },
		onSuccess,
		onError
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

export const updateIEInfoTimeData = (data: IEInfo) => {
	return api.post("/update/time", data);
};
