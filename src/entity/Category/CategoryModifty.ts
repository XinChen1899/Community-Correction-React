import { Dayjs } from "dayjs";

export interface CrpCategoryMoify {
	dxbh: string;
	gllb: string; // 变更后的类型
	tzyy: string; // 调整原因
	bdrq: string | Dayjs; //变动日期

	sfsshr: string; // 受委托的司法所审核人
	sfsshsj: string | Dayjs; //司法所审核时间
	sfsshyj: string; // 司法所审核意见
	xjsqjzjgspr: string; // 县级社区矫正机构审批人
	xjsqjzjgspsj: string | Dayjs; // 县级社区矫正机构审批时间
	xjsqjzjgspyj: string; // 县级社区矫正机构审批意见

	processId?: string; // 审批流程id
	step: number; // 当前步骤
}
