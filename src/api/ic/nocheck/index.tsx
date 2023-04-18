import { api } from "..";

export const getAllNoCheck = () => {
	return api.get("/crp/nocheck/all");
};
