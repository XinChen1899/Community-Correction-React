import { UnCorrectdInfo } from "@/entity/Uncorrected/UnCorrectedInfo";
import { getDate } from "@/utils/ie";
import axios from "axios";

export const api = axios.create({
	baseURL: "/uncorrected/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getAllUncorrected = () => {
	return api.get("/all");
};

export const implUncorrSFS = () => {
	return api.get("/sfs");
};

export const updateUnCorr = (info: UnCorrectdInfo) => {
	if (info.jcjzrq) info.jcjzrq = getDate(info.jcjzrq);
	return api.post("/update", info);
};

export const storeUncorr = (info: UnCorrectdInfo) => {
	if (info.jcjzrq) info.jcjzrq = getDate(info.jcjzrq);
	return api.post("/store", info);
};
