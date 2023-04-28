import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllReports = () => {
	return api.get("/report/all");
};

export const getReportDetails = (dxbh: string) => {
	return api.get(`/report/detail/${dxbh}`);
};

export const saveReport = (data: {
	dxbh: string;
	bg: string;
	date: string;
}) => {
	data.date = getDate(data.date);
	return api.post("/report/detail", data);
};

export const uploadDocx = (docx: any) => {
	let form = new FormData();
	form.append("file", docx);
	return api.post("/report/detail/upload", form);
};

export const downloadDocx = (name: string) => {
	return api.get(name, {
		responseType: "blob",
	});
};
