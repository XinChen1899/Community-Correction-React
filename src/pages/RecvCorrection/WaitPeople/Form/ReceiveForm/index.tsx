import { getAllCrt } from "@/api/ic/crteam";
import { CrTeam } from "@/entity/IC/CrTeam";
import { CodeMap, generateSelect, jzlbMap, xbMap } from "@/utils";
import { useRequest } from "ahooks";
import { DatePicker, Form, Input, message } from "antd";
import "react";
import { useState } from "react";

export function ReceiveForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
}) {
	const { form, onFinish, initialValues } = props;

	// 获取所有的矫正小组信息
	const [teamList, setTeamList] = useState<CodeMap[]>([]);
	useRequest(getAllCrt, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				const temp = data.data.map((team: CrTeam) => {
					return {
						code: team.id,
						value: team.teamName,
					};
				});
				setTeamList(temp);
			} else {
				message.error(data.message);
			}
		},
		onError: (error: any) => {
			message.error(error);
		},
		refreshDeps: [form],
	});

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"dxbh"} label={"社区矫正对象编号"}>
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
			<Form.Item name={"jzxz"}>
				<Form.Item name={"team"} label="确定矫正小组">
					{generateSelect(teamList, { disabled: true })}
				</Form.Item>
			</Form.Item>
		</Form>
	);
}
