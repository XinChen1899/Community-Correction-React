import { RewardInfo } from "@/entity/Assessment/Reward/RewardInfo";
import { RewardPraise } from "@/entity/Assessment/Reward/RewardPraise";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllRewards = () => {
	return api.get("/reward/all");
};

export const getRewardPraiseInfo = (id: number) => {
	return api.get(`/reward/praise/${id}`);
};

export const saveRewardPraiseInfo = (info: RewardPraise) => {
	info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	return api.post(`/reward/praise/update`, info);
};

export const saveRewardInfo = (modify: RewardInfo) => {
	modify.date = getDate(modify.date);
	return api.post("/reward/save", modify);
};
