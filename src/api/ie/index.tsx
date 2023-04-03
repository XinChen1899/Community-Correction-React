import { IEInfo } from "@/entity/IE/IEInfo";
import axios from "axios";
import { IEVisitInfo } from "@/entity/IE/IEVisitInfo";


export const saveIEInfoData = async (data: IEInfo) => {
	const result = await axios({
		url: "/ie/save",
		data,
		method: "post",
		headers: { "Access-Control-Allow-Origin": "*" }
	});
	console.log(result);
};

export const updateIEInfoData = async (data: IEInfo) => {
	const result = await axios({
		url: "/ie/update",
		data,
		method: "post",
		headers: { "Access-Control-Allow-Origin": "*" }
	});
	console.log(result);
};

export const saveIEVisInfoData = async (data: IEVisitInfo) => {
	const result = await axios({
		url: "/ie/vis/save",
		data,
		method: "post",
		headers: { "Access-Control-Allow-Origin": "*" }
	});
	console.log(result);
};

export const updateIEVisInfoData = async (data: IEVisitInfo) => {
	const result = await axios({
		url: "/ie/vis/update",
		data,
		method: "post",
		headers: { "Access-Control-Allow-Origin": "*" }
	});
	console.log(result);
};