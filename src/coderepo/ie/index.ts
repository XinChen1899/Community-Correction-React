import { Dayjs } from "dayjs";
import { IEInfo } from "@/entity/IE/IEInfo";


export const getDate = (date: Dayjs) => {
	return `${date.year()}/${date.month() + 1}/${date.date()}`;
};

export const IeFormConvert2IeInfo = (formData: any) => {
	const tempInfo = formData as IEInfo;
	tempInfo.pjrq = getDate(formData.pjrq);
	tempInfo.ypxqjsrq = getDate(formData.ypxqjsrq);
	tempInfo.bgrcsrq = getDate(formData.bgrcsrq);
	tempInfo.ypxqksrq = getDate(formData.ypxqksrq);
	return tempInfo;
};