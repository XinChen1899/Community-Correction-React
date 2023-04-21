import { Dayjs } from "dayjs";

export interface TerminationInfo {
	dxbh: string;
	xm: string;

	step: number;
	processId: string;
	spjg: string; // 审批结果

	zzjzlx: string; // 终止矫正类型
	zzjzrq: string | Dayjs; // 终止矫正日期

	sfsj: string; // 是否收监
	sjzxlx: string; // 收监执行类型
	sjzxrq: string | Dayjs; // 收监执行日期

	cxhxsjzxyy: string; // 撤销缓刑收监执行原因
	cxjssjzxyy: string; // 撤销假释收监执行原因
	sjzxyy: string; // 收监执行原因

	swsj: string | Dayjs; //死亡日期
	swlx: string; // 死亡类型
	jtsy: string; // 具体死因

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
