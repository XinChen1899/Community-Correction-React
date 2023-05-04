import { Dayjs } from "dayjs";

export interface ReportInfo {
	dxbh: string; // 对象编号
	xm: string; // 姓名
	sfzhm: string; // 身份证号

	crjzjzl: string; // 出入境证件种类
	crjzjhm: string; // 出入境证件号码
	bbsldw: string; // 报备受理单位
	bbdw: string; // 报备单位
	bbrq: string | Dayjs; // 报备日期
	bbksrq: string | Dayjs; // 报备开始日期
	bbjsrq: string | Dayjs; // 报备结束日期

	step: number; // 当前的状态
	processId?: string;
}
