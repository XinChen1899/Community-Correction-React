import { UnCorrectedAnnouncement } from "@/entity/Uncorrected/UnCorrectedAnnouncement";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllAnnouncement = () => {
	return api.get("/uncorrected/announcement/all");
};

export const saveAnnouncement = (info: UnCorrectedAnnouncement) => {
	if (info.xgrq) info.xgrq = getDate(info.xgrq);
	return api.post("/uncorrected/announcement/save", info);
};

export const updateAnnouncement = (info: UnCorrectedAnnouncement) => {
	if (info.xgrq) info.xgrq = getDate(info.xgrq);
	return api.post("/uncorrected/announcement/update", info);
};

export const finishAnnouncement = (info: UnCorrectedAnnouncement) => {
	if (info.xgrq) info.xgrq = getDate(info.xgrq);
	return api.post("/uncorrected/announcement/finish", info);
};
