import useAPI from "@/api";
import { api } from "..";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";

export const saveAnnounce = (
	crp: CrpAnnouncement,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/announce/save", method: "post", data: crp },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getAllAnnounces = (
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/announce/all", method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const updateAnnounce = (
	crp: CrpAnnouncement,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/announce/update", method: "post", data: crp },
		onSuccess,
		onError,
		setConfirmLoading
	);
};