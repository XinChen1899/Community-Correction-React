import { Dayjs } from "dayjs";

export interface UnCorrectdInfo {
	dxbh: string;
	xm: string;

	step: number;
	processId: string;
	spjg: string; // 审批结果

	jcjzlx: string; // 解除矫正类型
	jcjzrq: string | Dayjs; //解除日期

	jzqjbx: string; // 矫正期间表现
	rztd: string; // 认罪态度
	sfcjzyjnpx: string; // 矫正期间是否参加职业技能培训
	sfhdzyjnzs: string; //矫正期间是否获得职业技能证书
	jstcjdj: string; // 技术特长及等级
	wxxpg: string; // 危险性评估
	jtgx: string; // 家庭关系
	tsqkbzjbjjy: string; // 矫正期间特殊情况备注及帮教建议
	bz: string; // 备注
}
