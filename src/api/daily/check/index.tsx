import { api } from "..";

export const getAllChecks = () => {
	return api.get("/check/all");
};

export const getCheckDetails = (dxbh: string) => {
	if (dxbh != "") {
		return api.get(`/check/detail/${dxbh}`);
	} else {
		return new Promise((_, reject) => {
			reject("dxbh is required");
		});
	}
};

export const saveCheck = (data: { dxbh: string; date: string }) => {
	if (data.dxbh != "" && data.date != "") {
		return api.post("/check/detail", data);
	} else {
		return new Promise((_, reject) => {
			reject("dxbh or date is required");
		});
	}
};
