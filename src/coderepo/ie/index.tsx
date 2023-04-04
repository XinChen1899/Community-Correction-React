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

const bdcpgrdlxMap = {
	"01": "被告人",
	"02": "罪犯",
	"99": "其他"
};

const zmMap = {
	"01": "危害国家安全",
	"02": "危害公共安全",
	"03": "破坏社会主义市场经济秩序",
	"04": "侵犯公民人身权利、民主权利",
	"05": "侵犯财产",
	"06": "妨害社会管理秩序",
	"07": "危害国防利益",
	"08": "贪污受贿",
	"09": "渎职",
	"99": "其他"
};

const ypxfMap = {
	"01": "死刑缓期两年执行",
	"02": "无期徒刑",
	"03": "有期徒刑",
	"04": "拘役",
	"05": "管制"
};

const fjxMap = {
	"01": "罚金",
	"02": "剥夺政治权利",
	"03": "没收财产",
	"04": "驱逐出境",
	"05": "无",
	"99": "其他"
};

const pjjgMap = {
	"01": "人民法院",
	"02": "公安机关",
	"03": "监狱管理机关"
};

const nsyjzlbMap = {
	"01": "宽松",
	"02": "普通",
	"03": "严格"
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