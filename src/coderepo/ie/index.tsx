import {
	bdcpgrdlxMap,
	fjxMap,
	nsyjzlbMap,
	pjjgMap,
	ypxfMap,
	zmMap,
} from "@/coderepo";

export const getDate = (date: any) => {
	return `${date.year()}/${date.month() + 1}/${date.date()}`;
};

export const IeFormConvert2IeInfo = (formData: any) => {
	const tempInfo = formData;
	tempInfo.pjrq = getDate(formData.pjrq);
	tempInfo.ypxqjsrq = getDate(formData.ypxqjsrq);
	tempInfo.bgrcsrq = getDate(formData.bgrcsrq);
	tempInfo.ypxqksrq = getDate(formData.ypxqksrq);
	return tempInfo;
};

export const transform = (type: string, value: any) => {
	switch (type) {
		case "bdcpgrdlx":
			return bdcpgrdlxMap[value as keyof object];
		case "bgrxb":
			return value === "male" ? "男" : "女";
		case "zm":
			return zmMap[value as keyof object];
		case "ypxf":
			return ypxfMap[value as keyof object];
		case "fjx":
			return fjxMap[value as keyof object];
		case "pjjg":
			return pjjgMap[value as keyof object];
		case "nsyjzlb":
			return nsyjzlbMap[value as keyof object];
		default:
			return "UnKnown";
	}
};
