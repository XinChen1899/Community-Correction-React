import useAPI from "@/api";
import { api } from "..";
import { ScoreModify } from "@/entity/Assessment/ScoreModify";

export const getAllScores = (onSuccess: any, onError: any) => {
	useAPI(
		api,
		{
			url: "/score/all",
			method: "get",
		},
		onSuccess,
		onError
	);
};

export const getScoreDetail = (
	id: string,
	onSuccess: any,
	onError: any
) => {
	useAPI(
		api,
		{
			url: `/score/${id}`,
			method: "get",
		},
		onSuccess,
		onError
	);
};

export const saveScoreModify = (
	modify: ScoreModify,
	onSuccess: any,
	onError: any
) => {
	useAPI(
		api,
		{
			url: "/score/save",
			method: "post",
			data: modify,
		},
		onSuccess,
		onError
	);
};
