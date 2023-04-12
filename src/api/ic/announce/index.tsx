import useAPI from "@/api";
import { api } from "..";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";

export const saveAnnounce = (
	crp: CrpAnnouncement,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/announce/save", method: "post", data: crp },
		onSuccess,
		onError
	);
};

export const getAllAnnounces = (onSuccess?: any, onError?: any) => {
	useAPI(
		api,
		{ url: "/announce/all", method: "get" },
		onSuccess,
		onError
	);
};

export const updateAnnounce = (
	crp: CrpAnnouncement,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/announce/update", method: "post", data: crp },
		onSuccess,
		onError
	);
};
