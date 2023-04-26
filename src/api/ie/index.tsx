import { IEInfo } from "@/entity/IE/IEInfo";
import { SuggestInfo } from "@/entity/IE/SuggestInfo";
import axios from "axios";
import { useAPI } from "..";

export const api = axios.create({
	baseURL: "/ie/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export const uploadDocx = (docx: any) => {
	let form = new FormData();
	form.append("file", docx);
	return api.post("/suggest/upload", form);
};

export const download = (res: any, filename: string) => {
	// 创建blob对象，解析流数据
	const blob = new Blob([res], {
		// 设置返回的文件类型
		// type: 'application/pdf;charset=UTF-8' 表示下载文档为pdf，如果是word则设置为msword，excel为excel
		type: "application/msword;charset=utf-8",
	});
	// 这里就是创建一个a标签，等下用来模拟点击事件
	const a = document.createElement("a");
	// 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
	const URL = window.URL || window.webkitURL;
	// 根据解析后的blob对象创建URL 对象
	const herf = URL.createObjectURL(blob);
	// 下载链接
	a.href = herf;
	// 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
	a.download = filename;
	document.body.appendChild(a);
	// 点击a标签，进行下载
	a.click();
	// 收尾工作，在内存中移除URL 对象
	document.body.removeChild(a);
	window.URL.revokeObjectURL(herf);
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

export const saveIEInfoData = (
	data: IEInfo,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: "/save", method: "post", data: data },
		onSuccess,
		onError,
		setConfirmLoading
	);
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

export const getIEInfoById = (
	id: string,
	onSuccess?: any,
	onError?: any,
	setConfirmLoading?: any
) => {
	useAPI(
		api,
		{ url: `/${id}`, method: "get" },
		onSuccess,
		onError,
		setConfirmLoading
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
