import { Dayjs } from "dayjs";

export interface RewardPraise {
	id: number;
	dxbh: string;
	step: number;

	xjsqjzjgspr: string; // 县级社区矫正机构审批人
	xjsqjzjgspsj: string | Dayjs; // 县级社区矫正机构审批时间
	xjsqjzjgspyj: string; // 县级社区矫正机构审批意见

	spjg: string; // 审批结果
}
