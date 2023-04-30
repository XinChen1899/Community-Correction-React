import { CrpCategoryMoify } from "@/entity/Category/CategoryModifty";
import { getDate } from "@/utils/ie";
import axios from "axios";

const api = axios.create({
	baseURL: "/api/cate",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getAllCate = () => {
	return api.get("/info/all");
};

export const getModifyInfo = (dxbh: string) => {
	return api.get(`/modify/${dxbh}`);
};

export const updateCate = (info: CrpCategoryMoify) => {
	info.bdrq = getDate(info.bdrq);
	info.sfsshsj = getDate(info.sfsshsj);
	info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	return api.post("/modify/update", info);
};

// 模拟司法所向社区矫正机构发送调整类别申请
export const implCateSFS = (info: CrpCategoryMoify) => {
	info.bdrq = getDate(info.bdrq);
	info.sfsshsj = getDate(info.sfsshsj);
	info.xjsqjzjgspsj = getDate(info.xjsqjzjgspsj);
	return api.post("/modify/sfs", info);
};
