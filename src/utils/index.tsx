import { Select } from "antd";

interface CodeMap {
	code: string;
	value: string;
}

const getCodeMap = (arr: string[][]) => {
	const codeMap: CodeMap[] = arr.map((item) => {
		return {
			code: item[0],
			value: item[1],
		} as CodeMap;
	});
	return codeMap;
};
// 被调查评估人的类型
export const bdcpgrdlxMap = getCodeMap([
	["01", "被告人"],
	["02", "罪犯"],
	["99", "其他"],
]);

export const xbMap = getCodeMap([
	["01", "男"],
	["02", "女"],
]);

export const zmMap = [
	{ code: "01", value: "危害国家安全" },
	{ code: "02", value: "危害公共安全" },
	{ code: "03", value: "破坏社会主义市场经济秩序" },
	{ code: "04", value: "侵犯公民人身权利、民主权利" },
	{ code: "05", value: "侵犯财产" },
	{ code: "06", value: "妨害社会管理秩序" },
	{ code: "07", value: "危害国防利益" },
	{ code: "08", value: "贪污受贿" },
	{ code: "09", value: "渎职" },
	{ code: "99", value: "其他" },
];

export const ypxfMap = [
	{ code: "01", value: "死刑缓期两年执行" },
	{ code: "02", value: "无期徒刑" },
	{ code: "03", value: "有期徒刑" },
	{ code: "04", value: "拘役" },
	{ code: "05", value: "管制" },
];

export const fjxMap = [
	{ code: "01", value: "罚金" },
	{ code: "02", value: "剥夺政治权利" },
	{ code: "03", value: "没收财产" },
	{ code: "04", value: "驱逐出境" },
	{ code: "05", value: "无" },
	{ code: "99", value: "其他" },
];

export const pjjgMap = [
	{ code: "01", value: "人民法院" },
	{ code: "02", value: "公安机关" },
	{ code: "03", value: "监狱管理机关" },
];
// 对社矫对象的管理类别
export const nsyjzlbMap = [
	{ code: "01", value: "基础级" },
	{ code: "02", value: "宽松级" },
	{ code: "03", value: "普通级" },
	{ code: "04", value: "严格级" },
];
// 法院、侦查机关、检察院、公安、监狱局、监狱
export const wtdwMap = [
	{ code: "01", value: "法院" },
	{ code: "02", value: "检察院" },
	{ code: "03", value: "公安" },
	{ code: "04", value: "监狱" },
	{ code: "05", value: "侦查机关" },
];

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

export const hjlxMap = getCodeMap([
	["01", "乡村人口"],
	["02", "城镇人口"],
]);

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

export const crjzjzlMap = [
	{ code: "01", value: "普通护照" },
	{ code: "02", value: "往来港澳通行证及签注" },
	{ code: "03", value: "前往港澳通行证" },
	{ code: "04", value: "往来台湾通行证及签注" },
	{ code: "05", value: "中华人民共和国出入境通行证" },
	{ code: "06", value: "中华人民共和国边境地区出入境通行证" },
];

export const zzjzlxMap = [
	{ code: "01", value: "撤销缓刑" },
	{ code: "02", value: "撤销假释" },
	{ code: "03", value: "被决定收监执行" },
	{ code: "04", value: "死亡" },
	{ code: "99", value: "其他" },
];

export const sjMap = getCodeMap([
	["01", "否"],
	["02", "是"],
]);

export const sjzxlxMap = [
	{ code: "01", value: "撤销缓刑" },
	{ code: "02", value: "撤销假释" },
	{ code: "99", value: "其他" },
	{ code: "03", value: "对暂予监外执行社区矫正对象决定收监执行" },
];

export const jllbMap = getCodeMap([
	["01", "表扬"],
	["02", "立功"],
	["03", "重大立功"],
	["04", "减刑"],
]);

export const jcjzlxMap = getCodeMap([
	["01", "期满解除"],
	["02", "特赦"],
	["99", "其他"],
]);
// 认罪态度
export const rztdMap = getCodeMap([
	["01", "认罪服法"],
	["02", "服管不认罪"],
	["03", "认罪不服管"],
	["04", "不认罪不服管"],
]);
// 是否成年
export const sfcnMap = getCodeMap([
	["01", "否"],
	["02", "是"],
]);

// 审批结果
export const spjgMap = getCodeMap([
	["01", "通过"],
	["02", "不通过"],
]);

// 政治面貌
export const zzmmMap = getCodeMap([
	["01", "党员"],
	["02", "共青团员"],
	["03", "群众"],
	["04", "民主党派"],
	["05", "无党派人士"],
]);

export const zjMap = getCodeMap([
	// 代管/归还/收缴/吊销/作废
	["01", "代管"],
	["02", "归还"],
	["03", "收缴"],
	["04", "吊销"],
	["05", "作废"],
	["06", "未操作"],
]);

export const generateSelect = (
	selectList: any,
	config?: { width?: number; disabled?: boolean }
) => {
	if (!selectList) return;
	return (
		<Select
			style={{
				width: config
					? config.width
						? config.width
						: 290
					: 290,
			}}
			disabled={
				config
					? config.disabled
						? config.disabled
						: false
					: false
			}>
			{selectList.map((obj: any) => {
				return (
					<Select.Option value={obj.code} key={obj.value}>
						{obj.value}
					</Select.Option>
				);
			})}
		</Select>
	);
};

export const map2Value = (map: any[], code: string): string => {
	let value = "";
	map.forEach((item) => {
		if (item.code == code) {
			value = item.value;
			return;
		}
	});
	return value;
};
