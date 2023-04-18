import useAPI from "@/api";
import { api } from "..";
import { CrTeam } from "@/entity/IC/CrTeam";

export const saveCrt = (crt: CrTeam) => {
	return api.post("/crt/save", crt);
};

export const getAllCrt = () => {
	return api.get("/crt/all");
};

export const updateCrt = (crt: CrTeam) => {
	return api.post("/crt/update", crt);
};
