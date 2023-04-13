import useAPI from "@/api";
import { CrpPlan } from "@/entity/IC/CrpPlan";
import { api } from "..";

export const savePlan = (
	plan: CrpPlan,
	onSuccess: any,
	onError: any,
	setConfirmLoading: any
) => {
	useAPI(
		api,
		{ url: "/plan/save", method: "post", data: plan },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const updatePlan = (
	plan: CrpPlan,
	onSuccess: any,
	onError: any,
	setConfirmLoading: any
) => {
	useAPI(
		api,
		{ url: "/plan/update", method: "post", data: plan },
		onSuccess,
		onError,
		setConfirmLoading
	);
};

export const getAllPlan = (onSuccess: any, onError: any) => {
	useAPI(
		api,
		{ url: "/plan/all", method: "get" },
		onSuccess,
		onError
	);
};
