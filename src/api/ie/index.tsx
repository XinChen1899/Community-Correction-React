import { IEInfo } from "@/entity/IE/IEInfo";
import axios from "axios";
import { Dayjs } from "dayjs";

export const getDate = (date: Dayjs) => {
	return `${date.year()}/${date.month() + 1}/${date.date()}`;
};
export const saveData = async (data: IEInfo) => {
	const result = await axios({
		url: "/ie/save",
		data,
		method: "post",
		headers: { "Access-Control-Allow-Origin": "*" }
	});
	console.log(result);
};

export const updateData = async (data: IEInfo) => {
	const result = await axios({
		url: "/ie/update",
		data,
		method: "post",
		headers: { "Access-Control-Allow-Origin": "*" }
	});
	console.log(result);
};