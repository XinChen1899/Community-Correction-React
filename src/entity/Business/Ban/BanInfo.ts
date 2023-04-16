import { Dayjs } from "dayjs";

export interface BanInfo {
	step: number; // 审批步骤
	dxbh: string; // 申请对象的编号
	xm: string; // 申请人姓名
	sqjrcs: string; // 申请进入场所
	sqrq: string | Dayjs; //申请日期
	sqjrsj: string | Dayjs; //申请进入时间
	sqjssj: string | Dayjs; //申请结束时间
	sqly: string; // 申请理由
	sfsshr: string; // 受委托的司法所审核人
	sfsshsj: string | Dayjs; //司法所审核时间
	sfsshyj: string; // 司法所审核意见
	xjsqjzjgspr: string; // 县级社区矫正机构审批人
	xjsqjzjgspsj: string | Dayjs; // 县级社区矫正机构审批时间
	xjsqjzjgspyj: string; // 县级社区矫正机构审批意见
	xjsqjzjgsjg: string; // 县级社区矫正机构审批结果
}
