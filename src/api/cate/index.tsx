import { CrpCategoryMoify } from "@/entity/Category/CategoryModifty";
import axios from "axios";

const api = axios.create({
	baseURL: "/cate/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getAllCate = () => {
	return api.get("/info/all");
};

export const getModifyInfo = (dxbh: string) => {
	return api.get(`/modify/${dxbh}`);
};

export const updateCate = (data: CrpCategoryMoify) => {
	return api.post("/modify/update", data);
};

// 模拟司法所向社区矫正机构发送调整类别申请
export const implCateSFS = (info: CrpCategoryMoify) => {
	return api.post("/modify/sfs", info);
};
