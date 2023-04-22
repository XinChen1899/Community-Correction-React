import { IEInfo } from "@/entity/IE/IEInfo";
import dayjs from "dayjs";
import { getDateFromDayjs } from "../date";

export const getDate = getDateFromDayjs;

export const IeInfo2Ieform = (info: any) => {
	const tempInfo = info as IEInfo;
	tempInfo.pjrq = dayjs(info.pjrq);
	tempInfo.ypxqjsrq = dayjs(info.ypxqjsrq);
	tempInfo.bgrcsrq = dayjs(info.bgrcsrq);
	tempInfo.ypxqksrq = dayjs(info.ypxqksrq);
	return tempInfo;
};

export const IeFormConvert2IeInfo = (formData: any) => {
	const tempInfo = formData as IEInfo;
	tempInfo.pjrq = getDate(formData.pjrq);
	tempInfo.ypxqjsrq = getDate(formData.ypxqjsrq);
	tempInfo.bgrcsrq = getDate(formData.bgrcsrq);
	tempInfo.ypxqksrq = getDate(formData.ypxqksrq);
	return tempInfo;
};
