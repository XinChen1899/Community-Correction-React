import { TerminationInfo } from "@/entity/Termination/TerminationInfo";
import { getDate } from "@/utils/ie";
import axios from "axios";

export const api = axios.create({
	baseURL: "/api/term",
	headers: { "Access-Control-Allow-Origin": "*" },
});

const form2Obj = (info: TerminationInfo) => {
	info.zzjzrq = getDate(info.zzjzrq);
	info.sjzxrq = getDate(info.sjzxrq);
	info.swsj = getDate(info.swsj);
	info.zzjzrq = getDate(info.zzjzrq);
	return info;
};

export const getAllTerminations = () => {
	return api.get("/all");
};

export const implTermSFS = () => {
	return api.get("/sfs");
};

export const updateTerm = (info: TerminationInfo) => {
	info = form2Obj(info);
	return api.post("/update", info);
};

export const storeTerm = (info: TerminationInfo) => {
	info = form2Obj(info);
	return api.post("/store", info);
};
