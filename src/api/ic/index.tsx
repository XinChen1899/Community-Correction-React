import { CorrectionPeople } from "@/entity/IC/Crp";
import axios from "axios";

export const api = axios.create({
	baseURL: "/ic/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const registerCrp = (crp: CorrectionPeople) => {
	return api.post("/crp/register", crp);
};

export const updateCrp = (crp: CorrectionPeople) => {
	return api.post("/crp/update", crp);
};

export const recvCrp = (crp: CorrectionPeople) => {
	return api.post("/crp/recv", crp);
};

export const getCrpByDxbh = (id: string) => {
	return api.get(`/crp/${id}`);
};

export const getAllCrp = () => {
	return api.get("/crp/all");
};

export const getAllWorkers = () => {
	return api.get("/worker/all");
};
