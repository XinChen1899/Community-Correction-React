import { CorrectionPeople } from "@/entity/IC/Crp";
import { getDate } from "@/utils/ie";
import axios from "axios";

export const api = axios.create({
	baseURL: "/api/ic",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const registerCrp = (crp: CorrectionPeople) => {
	crp.csrq = getDate(crp.csrq);
	return api.post("/crp/register", crp);
};

export const updateCrp = (crp: CorrectionPeople) => {
	crp.csrq = getDate(crp.csrq);
	return api.post("/crp/update", crp);
};

export const recvCrp = (crp: CorrectionPeople) => {
	crp.csrq = getDate(crp.csrq);
	return api.post("/crp/recv", crp);
};

export const getCrpByDxbh = (id: string) => {
	return api.get(`/crp/${id}`);
};

export const getAllCrp = () => {
	return api.get("/crp/all");
};

export const getCount = () => {
	return api.get("/crp/counts");
};

export const getAllWorkers = () => {
	return api.get("/worker/all");
};

export const uploadImg = (img: any) => {
	let form = new FormData();
	form.append("file", img);
	return api.post("/crp/upload", form);
};

const downloadFile = (name: string) => {
	return api.get(name, {
		responseType: "blob",
	});
};

export const downloadWord = (name: string) => {
	return downloadFile(name);
};

export const exportWord = (crp: CorrectionPeople) => {
	crp.csrq = getDate(crp.csrq);
	return api.post("/crp/export", crp);
};
