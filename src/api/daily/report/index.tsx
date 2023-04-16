import useAPI from "@/api";
import { api } from "..";

export const getAllReports = (onSuccess: any, onError: any) => {
	useAPI(
		api,
		{
			url: "/report/all",
			method: "get",
		},
		onSuccess,
		onError
	);
};

export const getReportDetails = (
	dxbh: string,
	onSuccess: any,
	onError: any
) => {
	useAPI(
		api,
		{ url: `/report/detail/${dxbh}`, method: "get" },
		onSuccess,
		onError
	);
};

export const saveReport = (
	data: { dxbh: string; bg: string; date: string },
	onSuccess: any,
	onError: any,
	setConfirmLoading: any
) => {
	useAPI(
		api,
		{
			url: "/report/detail",
			method: "post",
			data,
		},
		onSuccess,
		onError,
		setConfirmLoading
	);
};
