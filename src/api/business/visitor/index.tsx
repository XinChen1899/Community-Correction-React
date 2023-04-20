import { VisitorInfo } from "@/entity/Business/Visitor/VisitorInfo";
import { getDate } from "@/utils/ie";
import { api } from "..";

export const getAllVisitor = () => {
	return api.get("/visitor/all");
};

const formConvertObject = (info: VisitorInfo) => {
	if (info.sqrq) info.sqrq = getDate(info.sqrq);
	if (info.hksj) info.hksj = getDate(info.hksj);
	if (info.sfsshsj) info.sfsshsj = getDate(info.sfsshsj);
	if (info.xjsqjzjgspsj)
		info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	return info;
};

// 模拟司法所向社区矫正机构发送信息
export const visSfsSendToJzjg = (info: VisitorInfo) => {
	info = formConvertObject(info);
	return api.post("/visitor/sfs/jzjg", info);
};

// 更新司法所审核部分
export const visSend2SFS = (info: VisitorInfo) => {
	info = formConvertObject(info);
	return api.post("/visitor/sfs", info);
};
// 发送给社区矫正机构，就是更新操作
export const visSend2JZJG = (info: VisitorInfo) => {
	info = formConvertObject(info);
	console.log(info);
	return api.post("/visitor/jzjg", info);
};

// 更新矫正机构审核部分
export const updateJZJGInfo = (
	info: any,
	onSuccess: any,
	onError: any
) => {};

export const saveVisitorInfo = (data: VisitorInfo) => {
	data = formConvertObject(data);
	return api.post("/visitor/save", data);
};
