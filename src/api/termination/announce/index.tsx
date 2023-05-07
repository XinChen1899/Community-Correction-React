import { TermAnnounce } from "@/entity/Termination/TermAnnounce";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const SaveTermAnnounce = (crp: TermAnnounce) => {
	crp.xgrq = getDate(crp.xgrq);
	return api.post("/announce/save", crp);
};

export const getAllTermAnnounces = () => {
	return api.get("/announce/all");
};

export const updateTermAnnounce = (crp: TermAnnounce) => {
	crp.xgrq = getDate(crp.xgrq);
	return api.post("/announce/update", crp);
};

export const finishTermAnnounce = (crp: TermAnnounce) => {
	crp.finish = "1";
	crp.xgrq = getDate(crp.xgrq);
	return api.post("/announce/update", crp);
};

export const uploadAudio = (docx: any) => {
	let form = new FormData();
	form.append("file", docx);
	return api.post("/announce/upload", form);
};

export const exportWord = (crp: TermAnnounce) => {
	crp.xgrq = getDate(crp.xgrq);
	return api.post("/announce/export", crp);
};

export const downloadAudio = (name: string) => {
	return api.get(name, {
		responseType: "blob",
	});
};

export const downloadWord = (name: string) => {
	return api.get(name, {
		responseType: "blob",
	});
};
