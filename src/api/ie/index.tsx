import { IEInfo } from "@/entity/IE/IEInfo";
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:9006/ie",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const saveIEInfoData = async (data: IEInfo) => {
	const result = await api.post("/save", data);
	console.log(result);
};

export const updateIEInfoData = async (data: IEInfo) => {
	const result = await api.post("/update", data);
	console.log(result);
};

export const getAll = async (callback1: any, callback2: any) => {
	const data = await axios.get("/all").then(({ data }) => data);
	return callback2(callback1(data));
};

export const getCount = async (callback: any) => {
	const data = await axios.get("/count").then(({ data }) => data);
	return callback(data);
};

export const getById = async (id: string) => {
	const data = await axios.get(`/${id}`).then(({ data }) => data);
	return data;
};
