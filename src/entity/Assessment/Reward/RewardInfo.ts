import { Dayjs } from "dayjs";

export interface RewardInfo {
	id: number;

	dxbh: string;
	xm: string;

	jllb: string; // 奖励类型
	jlyy: string; // 奖励原因
	date: string | Dayjs; // 奖励时间
	jlr: string; // 记录人

	step: number; // 当前审批步骤
	processId?: string; // 流程id
}
