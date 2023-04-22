import { UnCorrectdInfo } from "@/entity/Uncorrected/UnCorrectedInfo";
import { getDate } from "@/utils/ie";
import axios from "axios";
import { ServerTable } from "..";

export const api = axios.create({
	baseURL: `${ServerTable.uncorrected}`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getAllUncorrected = () => {
	return api.get("/uncorrected/all");
};

export const implUncorrSFS = () => {
	return api.get("/uncorrected/sfs");
};

export const updateUnCorr = (info: UnCorrectdInfo) => {
	if (info.jcjzrq) info.jcjzrq = getDate(info.jcjzrq);
	return api.post("/uncorrected/update", info);
};

export const storeUncorr = (info: UnCorrectdInfo) => {
	if (info.jcjzrq) info.jcjzrq = getDate(info.jcjzrq);
	return api.post("/uncorrected/store", info);
};
