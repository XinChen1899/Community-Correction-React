import { Dayjs } from "dayjs";

export interface CrpPlan {
	id: number; // 方案id
	dxbh: string; // 对象编号
	xm: string;
	famc: string; // 方案名称
	jzlb: string; // 矫正类别
	sfcn: string; // 是否成年
	jdglcs: string; //监督管理措施
	jyjzcs: string; // 教育矫正措施
	bkfzcs: string; // 帮困扶助措施
	qtcs: string; // 其他措施
	ssjgid: string; // 所属机构id
	ssxgpg: string; // 实施效果评估
	pgsj: string | Dayjs; //评估时间
	prg: string; // 评估人
}
