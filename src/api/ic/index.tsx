import { CorrectionPeople } from "@/entity/IC/Crp";
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:9007/ic/crp",
	headers: { "Access-Control-Allow-Origin": "*" },
});

const post = async (
	url: string,
	data: any,
	onSuccess?: any,
	onError?: any,
	callback?: any
) => {
	await api
		.post(url, data)
		.then(({ data }) => {
			console.log(data);
			if (data.status == "200") {
				onSuccess(data.data);
				if (callback) callback();
			} else {
				onError(data.message);
			}
		})
		.catch((reason) => {
			onError(reason.message);
		})
		.finally(callback);
};

const get = async (
	url: string,
	onSuccess?: any,
	onError?: any,
	callback?: any
) => {
	await api
		.get(url)
		.then(({ data }) => {
			console.log(data);
			if (data.status == "200") {
				onSuccess(data.data);
				if (callback) callback();
			} else {
				onError(data.message);
			}
		})
		.catch((reason) => {
			onError(reason.message);
		});
};

export const registerCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any,
	callback?: any
) => {
	post("/register", crp, onSuccess, onError, callback);
};

export const updateCrp = (
	crp: CorrectionPeople,
	onSuccess?: any,
	onError?: any,
	callback?: any
) => {
	post("/update", crp, onSuccess, onError, callback);
};

export const getCrpById = (
	id: string,
	onSuccess?: any,
	onError?: any
) => {
	return get(id, onSuccess, onError);
};

export const getAllCrp = (
	onSuccess?: any,
	onError?: any,
	callback?: any
) => {
	return get("/all", onSuccess, onError, callback);
};

// export const saveIEInfoData = async (data: IEInfo) => {
// 	const result = await api.post("/save", data);
// 	console.log(result);
// };

// export const updateIEInfoData = async (data: IEInfo) => {
// 	const result = await api.post("/update", data);
// 	console.log(result);
// };

// export const getAll = async (callback1: any, callback2: any) => {
// 	const data = await axios.get("/all").then(({ data }) => data);
// 	return callback2(callback1(data));
// };

// export const getCount = async (callback: any) => {
// 	const data = await axios.get("/count").then(({ data }) => data);
// 	return callback(data);
// };

// export const getById = async (id: string) => {
// 	const data = await axios.get(`/${id}`).then(({ data }) => data);
// 	return data;
// };
