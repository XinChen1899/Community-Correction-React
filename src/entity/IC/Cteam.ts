import { Worker } from "./Worker";

// 矫正小组
export interface CorrectionTeam {
	id: string; // 小组id
	teamName: string; // 小组名
	monitorName: string; // 小组队长
	teamNumber: number; // 小组成员个数
	workers: Worker[]; // 小组成员
}
