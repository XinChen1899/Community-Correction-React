import { api } from "..";
import { CrpAnnouncement } from "@/entity/IC/CrpAnnouncement";

export const saveAnnounce = (crp: CrpAnnouncement) => {
	return api.post("/announce/save", crp);
};

export const getAllAnnounces = () => {
	return api.get("/announce/all");
};

export const updateAnnounce = (crp: CrpAnnouncement) => {
	return api.post("/announce/update", crp);
};
