import { Dayjs } from "dayjs";

// 社区矫正对象基本信息
export interface CorrectionPeopleRec {
	sqjzdxbh: string;
	jzlb: string;
	xm: string;
	xb: string;
	sfzhm: string;
	csrq: string;
	grlxdh: string;
	xgrq: Dayjs | string;
	zp: string;
	jzxz: number;
}
