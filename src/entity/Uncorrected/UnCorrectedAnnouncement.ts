import { Dayjs } from "dayjs";

export interface UnCorrectedAnnouncement {
	dxbh: string;
	xm: string;
	xgrq: string | Dayjs; // 宣告日期

	finish: string; // 是否结束
}
