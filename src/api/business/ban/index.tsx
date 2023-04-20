import { BanInfo } from "@/entity/Business/Ban/BanInfo";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllBans = () => {
	return api.get("/ban/all");
};

const formConvertObject = (info: BanInfo) => {
	if (info.sqrq) info.sqrq = getDate(info.sqrq);
	if (info.sqjrsj) info.sqjrsj = getDate(info.sqjrsj);
	if (info.sqjssj) info.sqjssj = getDate(info.sqjssj);
	if (info.sfsshsj) info.sfsshsj = getDate(info.sfsshsj);
	if (info.xjsqjzjgspsj)
		info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	return info;
};

// 模拟司法所向社区矫正机构发送信息
export const sfsSendToJzjg = (info: BanInfo) => {
	info = formConvertObject(info);
	return api.post("/ban/sfs/jzjg", info);
};

// 更新司法所审核部分
export const send2SFS = (info: BanInfo) => {
	info = formConvertObject(info);
	return api.post("/ban/sfs", info);
};
// 发送给社区矫正机构，就是更新操作
export const send2JZJG = (info: BanInfo) => {
	info = formConvertObject(info);
	console.log(info);
	return api.post("/ban/jzjg", info);
};

// 更新矫正机构审核部分
export const updateJZJGInfo = (
	info: any,
	onSuccess: any,
	onError: any
) => {};

export const saveBanInfo = (data: BanInfo) => {
	data = formConvertObject(data);
	return api.post("/ban/save", data);
};
