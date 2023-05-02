import { Dayjs } from "dayjs";

// 社区矫正对象基本信息
export interface CorrectionPeople {
	dxbh: string; //社区矫正对象编号
	sfdcpg: string; //是否调查评估
	jzlb: string; //矫正类别
	xm: string; //姓名
	xb: string; //性别
	mz: string; //民族
	gj: string; //国籍
	hjlx: string; //户籍类型
	sfzhm: string; //身份证号码
	csrq: string | Dayjs; //出生日期
	whcd: string; //文化程度
	hyzk: string; //婚姻状况
	jyjxqk: string; //就业就学情况
	xzzmm: string; //政治面貌
	xgzdw: string; //现工作单位
	dwlxdh: string; //单位联系电话
	grlxdh: string; //个人联系电话
	ywjtcyjzyshgx: string; //有无家庭成员及主要社会关系
	zp: string;
	team: string;
	status: string;
}
