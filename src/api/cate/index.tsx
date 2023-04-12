import { CorrectionPeople } from "@/entity/IC/Crp";
import axios from "axios";
import { ServerTable, useAPI } from "..";
import { CrTeam } from "@/entity/IC/CrTeam";
import { CrpCategory } from "@/entity/Category/CategoryInfo";

const api = axios.create({
	baseURL: `${ServerTable.cate}/cate`,
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getAllCate = (onSuccess?: any, onError?: any) => {
	useAPI(api, { url: "/all", method: "get" }, onSuccess, onError);
};

export const updateCate = (
	data: CrpCategory,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/update", method: "post", data: data },
		onSuccess,
		onError
	);
};
