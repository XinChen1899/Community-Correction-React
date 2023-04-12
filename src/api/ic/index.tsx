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

export const getCrpById = (
	id: string,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: `/crp/${id}`, method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getAllCrp = (
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/crp/all", method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getAllWorkers = (
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/worker/all", method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};
