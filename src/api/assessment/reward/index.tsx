import { RewardInfo } from "@/entity/Assessment/Reward/RewardInfo";
import { RewardLg } from "@/entity/Assessment/Reward/RewardLg";
import { RewardPraise } from "@/entity/Assessment/Reward/RewardPraise";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllRewards = () => {
	return api.get("/reward/all");
};

export const saveRewardInfo = (modify: RewardInfo) => {
	modify.date = getDate(modify.date);
	return api.post("/reward/save", modify);
};

export const getRewardPraiseInfo = (id: number) => {
	return api.get(`/reward/praise/${id}`);
};

export const saveRewardPraiseInfo = (info: RewardPraise) => {
	info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	return api.post(`/reward/praise/update`, info);
};

export const getRewardLgInfo = (id: number) => {
	return api.get(`/reward/lg/${id}`);
};

// 将立功审批表发送给市局社区矫正机构
export const lgSend2Sj = (info: RewardLg) => {
	info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	info.sjsqjzjgspsj = getDate(info.sjsqjzjgspsj);
	return api.post(`/reward/lg/update`, info);
};

// 模拟市局审批
export const lgImplSJ = (info: RewardLg) => {
	info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	info.sjsqjzjgspsj = getDate(info.sjsqjzjgspsj);
	return api.post(`/reward/lg/impl`, info);
};
