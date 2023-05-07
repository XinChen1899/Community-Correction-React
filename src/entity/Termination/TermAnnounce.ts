import { Dayjs } from "dayjs";

export interface TermAnnounce {
	dxbh: string;
	xm: string;
	xgrq: string | Dayjs;
	audio: string;
	finish: boolean;
}
