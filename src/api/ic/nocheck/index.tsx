import useAPI from "@/api";
import { api } from "..";

export const getAllNoCheck = (onSuccess: any, onError: any) => {
	useAPI(
		api,
		{ url: "/crp/nocheck/all", method: "get" },
		onSuccess,
		onError
	);
};
