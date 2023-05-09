import { CrTeam } from "@/entity/IC/CrTeam";
import { api } from "..";

export const saveCrt = (crt: CrTeam) => {
	return api.post("/crt/save", crt);
};

export const getAllCrt = () => {
	return api.get("/crt/all");
};

export const updateCrt = (crt: CrTeam) => {
	console.log(crt);
	return api.post("/crt/update", crt);
};
