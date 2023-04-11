import { CorrectionPeople } from "@/entity/IC/Crp";
import axios from "axios";
import { ServerTable, useAPI } from "..";
import { Cteam } from "@/entity/IC/Cteam";

const api = axios.create({
	baseURL: `${ServerTable.ic}/ic`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const registerCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/crp/register", method: "post", data: crp },
		onSuccess,
		onError
	);
};

export const saveCrt = (
	crp: Cteam,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/crt/save", method: "post", data: crp },
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
		{ url: "/crp/update", method: "post", data: crp },
		onSuccess,
		onError
	);
};

export const getCrpById = (
	id: string,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: `/crp/${id}`, method: "get" },
		onSuccess,
		onError
	);
};

export const getAllCrp = (onSuccess?: any, onError?: any) => {
	useAPI(
		api,
		{ url: "/crp/all", method: "get" },
		onSuccess,
		onError
	);
};

export const getAllCrt = (onSuccess?: any, onError?: any) => {
	useAPI(
		api,
		{ url: "/crt/all", method: "get" },
		onSuccess,
		onError
	);
};

export const getAllWorkers = (onSuccess?: any, onError?: any) => {
	useAPI(
		api,
		{ url: "/worker/all", method: "get" },
		onSuccess,
		onError
	);
};
