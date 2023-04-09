import {
	bdcpgrdlxMap,
	fjxMap,
	nsyjzlbMap,
	pjjgMap,
	ypxfMap,
	zmMap,
} from "@/coderepo";
import { IEInfo } from "@/entity/IE/IEInfo";

export const getDate = (date: any) => {
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

export const map2Value = (map: any[], code: string) => {
	let value;
	map.forEach((item) => {
		if (item.code == code) {
			value = item.value;
			return;
		}
	});
	return value;
};
