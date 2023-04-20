import { RewardInfo } from "@/entity/Assessment/Reward/RewardInfo";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllRewards = () => {
	return api.get("/assess/reward/all");
};

export const saveRewardInfo = (modify: RewardInfo) => {
	modify.date = getDate(modify.date);
	return api.post("/assess/reward/save", modify);
};
