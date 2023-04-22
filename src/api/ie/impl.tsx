import { IEInfo } from "@/entity/IE/IEInfo";
import { api } from ".";

// 模拟委托方开启一个调查评估流程
export const implWTF = () => {
	return api.get("/task/start");
};

// 获取所有待办的调查评估
export const getAllDcpg = () => {
	return api.get("/task/all");
};

// 模拟委托方发送调查评估委托函
export const implSend2JZJG = () => {
	return api.post("/task/recv");
};

export const unacceptedDcpg = (info: IEInfo) => {
	return api.post("/task/unaccepted", info);
};

export const acceptDcpg = (info: IEInfo) => {
	return api.post("/task/accept", info);
};
