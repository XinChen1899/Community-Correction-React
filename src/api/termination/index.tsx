import { TerminationInfo } from "@/entity/Termination/TerminationInfo";
import { getDate } from "@/utils/ie";
import axios from "axios";
import { ServerTable } from "..";

export const api = axios.create({
	baseURL: `${ServerTable.termination}`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getAllTerminations = () => {
	return api.get("/termination/all");
};

export const implTermSFS = () => {
	return api.get("/termination/sfs");
};

export const updateTerm = (info: TerminationInfo) => {
	info.zzjzrq = getDate(info.zzjzrq);
	info.sjzxrq = getDate(info.sjzxrq);
	info.swsj = getDate(info.swsj);
	info.zzjzrq = getDate(info.zzjzrq);
	return api.post("/termination/update", info);
};

export const storeTerm = (info: TerminationInfo) => {
	info.zzjzrq = getDate(info.zzjzrq);
	info.sjzxrq = getDate(info.sjzxrq);
	info.swsj = getDate(info.swsj);
	info.zzjzrq = getDate(info.zzjzrq);
	return api.post("/termination/store", info);
};
