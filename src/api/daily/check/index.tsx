import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllChecks = () => {
	return api.get("/check/all");
};

export const getCheckDetails = (dxbh: string) => {
	return api.get(`/check/detail/${dxbh}`);
};

export const saveCheck = (data: { dxbh: string; date: string }) => {
	data.date = getDate(data.date);
	return api.post("/check/detail", data);
};
