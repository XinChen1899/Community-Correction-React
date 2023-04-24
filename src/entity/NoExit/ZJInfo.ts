export interface ZJInfo {
	dxbh: string; // 对象编号
	xm: string; // 姓名

	zj: string; // 证件状态

	step: number; // 当前的状态
	processId?: string;
}
