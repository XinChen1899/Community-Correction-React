import { ScoreModify } from "@/entity/Assessment/Score/ScoreModify";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllScores = () => {
	return api.get("/score/all");
};

export const getScoreDetail = (id: string) => {
	return api.get(`/score/${id}`);
};

export const saveScoreModify = (modify: ScoreModify) => {
	modify.date = getDate(modify.date);
	return api.post("/score/save", modify);
};
