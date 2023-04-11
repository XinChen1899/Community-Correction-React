import { Worker } from "./Worker";

// 矫正小组
export interface Cteam {
	id: string; // 小组id
	teamName: string; // 小组名
	monitor: string; // 小组队长id
	teamNumber: number; // 小组成员个数
	workers: string[]; // 小组成员
}
