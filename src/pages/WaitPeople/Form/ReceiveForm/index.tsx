import "react";
import { DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { generateSelect, jzlbMap, xbMap } from "@/utils";
import { getAllCrt } from "@/api/ic/crteam";
import { CrTeam } from "@/entity/IC/CrTeam";

export function ReceiveForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
}) {
	const { form, onFinish, initialValues } = props;

	const [team, setTeam] = useState<any[]>();
	useEffect(() => {
		getAllCrt(
			(teamList: any[]) => {
				if (teamList != undefined) {
					const temp = teamList.map((team: CrTeam) => {
						return {
							code: team.id,
							value: team.teamName,
						};
					});

					setTeam(temp);
				}
			},
			() => {}
		);
	}, [form]);

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"sqjzdxbh"} label={"社区矫正对象编号"}>
				<Input
					placeholder={"请输入社区矫正对象编号"}
					disabled
				/>
			</Form.Item>
			<Form.Item name={"jzlb"} label="矫正类别">
				{generateSelect(jzlbMap, { disabled: true })}
			</Form.Item>
			<Form.Item name={"xm"} label="姓名">
				<Input placeholder={"请输入姓名"} disabled />
			</Form.Item>
			<Form.Item name={"xb"} label="性别">
				{generateSelect(xbMap, { disabled: true })}
			</Form.Item>
			<Form.Item name={"sfzhm"} label="身份证号码">
				<Input
					placeholder={"请输入身份证号码"}
					maxLength={18}
					disabled
				/>
			</Form.Item>
			<Form.Item name={"csrq"} label="出生日期">
				<DatePicker disabled />
			</Form.Item>

			<Form.Item name={"grlxdh"} label="个人联系电话">
				<Input placeholder="请输入个人联系电话" disabled />
			</Form.Item>
			<Form.Item name={"xgrq"} label="宣告日期">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"jzxz"} label="矫正小组">
				<Form.Item name={"team"} label="确定矫正小组">
					{generateSelect(team, { disabled: true })}
				</Form.Item>
			</Form.Item>
		</Form>
	);
}
