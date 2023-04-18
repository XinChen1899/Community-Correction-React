import { api } from "..";

export const getAllChecks = (): Promise<any> => {
	try {
		return api.get("/check/all");
	} catch (err) {
		return new Promise((_, reject) => {
			reject("出错啦!");
		});
	}
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
