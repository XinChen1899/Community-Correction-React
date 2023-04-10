import { CorrectionPeople } from "@/entity/IC/Crp";
import axios from "axios";
import { ServerTable, useAPI } from "..";

const api = axios.create({
	baseURL: `${ServerTable.ic}/ic/crp`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const registerCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/register", method: "post", data: crp },
		onSuccess,
		onError
	);
};

export const updateCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "update", method: "post", data: crp },
		onSuccess,
		onError
	);
};

export const getCrpById = (
	id: string,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(api, { url: `/${id}`, method: "get" }, onSuccess, onError);
};

export const getAllCrp = (onSuccess?: any, onError?: any) => {
	useAPI(api, { url: "/all", method: "get" }, onSuccess, onError);
};
