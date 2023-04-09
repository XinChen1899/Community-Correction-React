import axios from "axios";
import { apiGet } from "..";

const api = axios.create({
	baseURL: "http://localhost:9007/noexit",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const getBBForm = (
	dxbh: string,
	onSuccess: any,
	onError: any
) => {
	apiGet(api, `/bb/${dxbh}`, onSuccess, onError);
};

export const getExitInfoByDXBH = (
	dxbh: string,
	onSuccess: any,
	onError: any
) => {
	apiGet(api, `/info/${dxbh}`, onSuccess, onError);
};
