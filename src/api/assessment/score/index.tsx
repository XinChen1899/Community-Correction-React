import { ScoreModify } from "@/entity/Assessment/Score/ScoreModify";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllScores = () => {
	return api.get("/assess/score/all");
};

export const getScoreDetail = (id: string) => {
	return api.get(`/assess/score/${id}`);
};

export const saveScoreModify = (modify: ScoreModify) => {
	modify.date = getDate(modify.date);
	return api.post("/assess/score/save", modify);
};
