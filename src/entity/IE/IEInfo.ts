import { Dayjs } from "dayjs";

export interface IEInfo {
	wtbh: string; // 委托编号
	processId: string; // 委托流程id
	step: number; // 流程步骤
	finish: number; // 完成时间
	wtdw: string; // 委托单位
	wtdch: string; // 调查评估委托函
	bdcpgrdlx: string; // 被调查评估对象的类型
	bgrxm: string; // 被调查评估对象姓名
	bgrsfzh: string; // 被调查评估对象身份证号
	bgrxb: string; // 被调查评估对象性别
	bgrcsrq: string | Dayjs; // 被调查评估对象出生日期
	bgrjzddz: string; // 被调查评估对象居住地地址
	bgrgzdw: string; // 被调查评估对象工作单位
	zm: string; // 罪名
	ypxq: string; // 原判刑期
	ypxqksrq: string | Dayjs; // 原判刑期开始日期
	ypxqjsrq: string | Dayjs; // 原判刑期结束日期
	ypxf: string; // 原判刑罚
	fjx: string; // 附加刑
	pjjg: string; // 判决机关
	pjrq: string | Dayjs; // 判决日期
	nsyjzlb: string; // 拟适用矫正类别
	dcdwxqj: string; // 接受委托的县级社区矫正机构
}
