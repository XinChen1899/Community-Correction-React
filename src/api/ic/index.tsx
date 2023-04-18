import { CorrectionPeople } from "@/entity/IC/Crp";
import axios from "axios";
import { ServerTable, useAPI } from "..";

export const api = axios.create({
	baseURL: `${ServerTable.ic}/ic`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const registerCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/crp/register", method: "post", data: crp },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const updateCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/crp/update", method: "post", data: crp },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const recvCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/crp/recv", method: "post", data: crp },
		onSuccess,
		onError,
		setConfirmLoading
	);
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
