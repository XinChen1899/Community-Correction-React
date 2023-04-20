import { Dayjs } from "dayjs";

export interface VisitorInfo {
	step: number; // 审批步骤
	processId?: string;

	dxbh: string; // 申请对象的编号
	xm: string; // 申请人姓名

	hjrxm: string; // 会见人姓名
	hksj: string | Dayjs; //会客时间
	hkdd: string; // 会客地点
	hkyy: string; // 会客原因
	sqrq: string | Dayjs; // 申请时间

	sfsshr: string; // 受委托的司法所审核人
	sfsshsj: string | Dayjs; //司法所审核时间
	sfsshyj: string; // 司法所审核意见

	xjsqjzjgspr: string; // 县级社区矫正机构审批人
	xjsqjzjgspsj: string | Dayjs; // 县级社区矫正机构审批时间
	xjsqjzjgspyj: string; // 县级社区矫正机构审批意见

	spjg: string; //审批结果
}
