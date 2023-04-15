import useAPI from "@/api";
import { api } from "..";

export const getAllChecks = (onSuccess: any, onError: any) => {
	useAPI(
		api,
		{
			url: "/check/all",
			method: "get",
		},
		onSuccess,
		onError
	);
};


export const getCheckDetails = (
	dxbh: string,
	onSuccess: any,
	onError: any
) => {
	useAPI(
		api,
		{ url: `/detail/${dxbh}`, method: "get" },
		onSuccess,
		onError
	);
};

export const saveCheck = (
	data: { dxbh: string; date: string },
	onSuccess: any,
	onError: any,
	setConfirmLoading: any
) => {
	useAPI(
		api,
		{
			url: "/detail",
			method: "post",
			data,
		},
		onSuccess,
		onError,
		setConfirmLoading
	);
};
