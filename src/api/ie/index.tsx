import { IEInfo } from "@/entity/IE/IEInfo";
import { SuggestInfo } from "@/entity/IE/SuggestInfo";
import axios from "axios";
import { useAPI } from "..";

export const api = axios.create({
	baseURL: "/api/ie",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const uploadDocx = (docx: any) => {
	let form = new FormData();
	form.append("file", docx);
	return api.post("/suggest/upload", form);
};

export const downloadTemplate = (name?: string) => {
	if (name == undefined || name == null) {
		return api.get(
			"https://ccorr-bucket.oss-cn-shenzhen.aliyuncs.com/docxs/%E8%B0%83%E6%9F%A5%E8%AF%84%E4%BC%B0%E6%84%8F%E8%A7%81%E4%B9%A6%E6%A8%A1%E6%9D%BF.doc",
			{
				responseType: "blob",
			}
		);
	} else {
		return api.get(name, {
			responseType: "blob",
		});
	}
};

export const updateIEInfo = (data: IEInfo) => {
	return api.post("/update", data);
};

export const getAllIEInfos = () => {
	return api.get("/all");
};

export const finishIE = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any
) => {
	useAPI(
		api,
		{ url: "/finish", method: "post", data },
		onSuccess,
		onError
	);
};

export const getSuggestInfoById = (id: string) => {
	return api.get(`/suggest/${id}`);
};

export const updateSuggestInfoData = (data: SuggestInfo) => {
	return api.post("/suggest/update", data);
};

export const updateIEInfoTimeData = (data: IEInfo) => {
	return api.post("/update/time", data);
};
