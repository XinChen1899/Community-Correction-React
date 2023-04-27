import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const saveAnnounce = (crp: CrpAnnouncement) => {
	crp.xgrq = getDate(crp.xgrq);
	return api.post("/announce/save", crp);
};

export const getAllAnnounces = () => {
	return api.get("/announce/all");
};

export const updateAnnounce = (crp: CrpAnnouncement) => {
	crp.xgrq = getDate(crp.xgrq);
	return api.post("/announce/update", crp);
};

export const finishAnnounce = (crp: CrpAnnouncement) => {
	crp.finish = true;
	crp.xgrq = getDate(crp.xgrq);
	return api.post("/announce/update", crp);
};

export const uploadAudio = (docx: any) => {
	let form = new FormData();
	form.append("file", docx);
	return api.post("/announce/upload", form);
};

export const downloadAudio = (name: string) => {
	return api.get(name, {
		responseType: "blob",
	});
};
