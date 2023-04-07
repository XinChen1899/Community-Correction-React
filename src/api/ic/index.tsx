import { CorrectionPeople } from "@/entity/IC/Crp";
import axios from "axios";
import { apiGet, apiPost } from "..";

const api = axios.create({
	baseURL: "http://localhost:9007/ic/crp",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const registerCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any
) => {
	apiPost(api, "/register", crp, onSuccess, onError);
};

export const updateCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any
) => {
	apiPost(api, "/update", crp, onSuccess, onError);
};

export const getCrpById = (
	id: string,
	onSuccess?: any,
	onError?: any
) => {
	return apiGet(api, id, onSuccess, onError);
};

export const getAllCrp = (onSuccess?: any, onError?: any) => {
	return apiGet(api, "/all", onSuccess, onError);
};
