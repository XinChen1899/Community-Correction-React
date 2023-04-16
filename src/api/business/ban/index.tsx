import useAPI from "@/api";
import { api } from "..";
import { BanInfo } from "@/entity/Business/Ban/BanInfo";

export const getAllBans = (onSuccess: any, onError: any) => {
	useAPI(
		api,
		{
			url: "/business/ban/all",
			method: "get",
		},
		onSuccess,
		onError
	);
};
// 更新司法所审核部分
export const updateSFSInfo = (
	info: any,
	onSuccess: any,
	onError: any
) => {};

// 更新矫正机构审核部分
export const updateJZJGInfo = (
	info: any,
	onSuccess: any,
	onError: any
) => {};

export const getCheckDetails = (
	dxbh: string,
	onSuccess: any,
	onError: any
) => {
	useAPI(
		api,
		{ url: `/check/detail/${dxbh}`, method: "get" },
		onSuccess,
		onError
	);
};

export const saveBanInfo = (
	data: BanInfo,
	onSuccess: any,
	onError: any,
	setConfirmLoading: any
) => {
	useAPI(
		api,
		{
			url: "/business/ban/save",
			method: "post",
			data,
		},
		onSuccess,
		onError,
		setConfirmLoading
	);
};
