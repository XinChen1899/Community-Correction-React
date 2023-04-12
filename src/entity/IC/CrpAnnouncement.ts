import { Dayjs } from "dayjs";

// 社区矫正对象基本信息
export interface CrpAnnouncement {
	dxbh: string;
	xm: string;
	xgrq: string | Dayjs;
	audio: string;
	finish: boolean;
}
