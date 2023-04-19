import { CrpPlan } from "@/entity/IC/CrpPlan";
import { api } from "..";

export const savePlan = (plan: CrpPlan) => {
	return api.post("/plan/save", plan);
};

export const updatePlan = (plan: CrpPlan) => {
	return api.post("/plan/update", plan);
};

export const getAllPlan = (onSuccess: any, onError: any) => {
	return api.get("/plan/all");
};
