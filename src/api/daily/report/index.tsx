import { api } from "..";

export const getAllReports = () => {
	return api.get("/report/all");
};

export const getReportDetails = (dxbh: string) => {
	if (dxbh && dxbh != "") {
		return api.get(`/report/detail/${dxbh}`);
	} else {
		return new Promise((_, reject) => {
			reject("dxbh is required");
		});
	}
};

export const saveReport = (data: {
	dxbh: string;
	bg: string;
	date: string;
}) => {
	if (data) {
		return api.post("/report/detail", data);
	} else {
		return new Promise((_, reject) => {
			reject("data is required");
		});
	}
};
