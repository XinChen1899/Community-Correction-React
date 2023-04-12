import useAPI from "@/api";
import { api } from "..";
import { CrTeam } from "@/entity/IC/CrTeam";

export const saveCrt = (
	crp: CrTeam,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/crt/save", method: "post", data: crp },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getAllCrt = (
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/crt/all", method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const updateCrt = (
	crp: CrTeam,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/crt/update", method: "post", data: crp },
		onSuccess,
		onError,
		setConfirmLoading
	);
};
