import { Select } from "antd";

export const bdcpgrdlxMap = {
	"01": "被告人",
	"02": "罪犯",
	"99": "其他",
};

export const xxMap = [{ code: "01", value: "xxx" }];

export const zmMap = {
	"01": "危害国家安全",
	"02": "危害公共安全",
	"03": "破坏社会主义市场经济秩序",
	"04": "侵犯公民人身权利、民主权利",
	"05": "侵犯财产",
	"06": "妨害社会管理秩序",
	"07": "危害国防利益",
	"08": "贪污受贿",
	"09": "渎职",
	"99": "其他",
};

export const ypxfMap = {
	"01": "死刑缓期两年执行",
	"02": "无期徒刑",
	"03": "有期徒刑",
	"04": "拘役",
	"05": "管制",
};

export const fjxMap = {
	"01": "罚金",
	"02": "剥夺政治权利",
	"03": "没收财产",
	"04": "驱逐出境",
	"05": "无",
	"99": "其他",
};

export const pjjgMap = {
	"01": "人民法院",
	"02": "公安机关",
	"03": "监狱管理机关",
};

export const nsyjzlbMap = {
	"01": "宽松",
	"02": "普通",
	"03": "严格",
};

export const jzlbMap = [
	{ code: "01", value: "管制" },
	{ code: "02", value: "缓刑" },
	{ code: "03", value: "假释" },
	{ code: "04", value: "暂予监外执行" },
	{ code: "99", value: "其他" },
];

// todo 民族
export const mzMap = [
	{ code: "01", value: "汉族" },
	{ code: "02", value: "蒙古族" },
	{ code: "03", value: "回族" },
	{ code: "04", value: "藏族" },
	{ code: "05", value: "维吾尔族" },
];

export const gjMap = [
	{ code: "01", value: "中国籍" },
	{ code: "0101", value: "中国大陆" },
	{ code: "0102", value: "中国香港" },
	{ code: "0103", value: "中国澳门" },
	{ code: "0104", value: "中国台湾" },
	{ code: "02", value: "外国籍" },
	{ code: "03", value: "无国籍" },
	{ code: "99", value: "其他" },
];

export const hjlxMap = [
	{ code: "01", value: "乡村人口" },
	{ code: "02", value: "城镇人口" },
];

export const hyzkMap = [
	{ code: "01", value: "未婚" },
	{ code: "02", value: "已婚" },
	{ code: "03", value: "离异" },
	{ code: "04", value: "丧偶" },
	{ code: "99", value: "其他" },
];

export const whcdMap = [
	{ code: "01", value: "文盲" },
	{ code: "02", value: "小学" },
	{ code: "03", value: "初中" },
	{ code: "04", value: "高中" },
	{ code: "05", value: "中专和中技" },
	{ code: "06", value: "大专" },
	{ code: "07", value: "本科" },
	{ code: "08", value: "研究生" },
	{ code: "99", value: "其他" },
];

export const jyjxqkMap = [
	{ code: "01", value: "就业" },
	{ code: "02", value: "无业" },
	{ code: "03", value: "就学" },
];

export const generateSelect = (selectList: any) => {
	return (
		<Select style={{ width: 120 }}>
			{selectList.map((obj: any, idx: number) => {
				return (
					<Select.Option value={obj.code} key={idx}>
						{obj.value}
					</Select.Option>
				);
			})}
		</Select>
	);
};
