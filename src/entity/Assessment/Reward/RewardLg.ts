import { Dayjs } from "dayjs";

export interface RewardLg {
	id: number; // 立功奖励的编号
	dxbh: string;
	step: number;
	processId?: string; // 流程id

	xjsqjzjgspr: string; // 县级社区矫正机构审批人
	xjsqjzjgspsj: string | Dayjs; // 县级社区矫正机构审批时间
	xjsqjzjgspyj: string; // 县级社区矫正机构审批意见

	sjsqjzjgspr: string; // 市级社区矫正机构审批人
	sjsqjzjgspsj: string | Dayjs; // 市级社区矫正机构审批时间
	sjsqjzjgspyj: string; // 市级社区矫正机构审批意见

	spjg: string; // 审批结果
}
