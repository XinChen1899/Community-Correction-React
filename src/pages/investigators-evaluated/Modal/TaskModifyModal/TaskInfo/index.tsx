import React from "react";
import { Card, DatePicker, Descriptions, Form, Input, Select } from "antd";
import { DataType } from "@/pages/investigators-evaluated/TaskTable";
import { Space } from "antd/lib";

const { RangePicker } = DatePicker;
const { TextArea } = Input;


const TaskInfo = (props: { selectTask: DataType }) => {
	const { selectTask } = props;

	// todo 发起api请求完整的调查评估信息

	return (
		<div>
			<Card title={"调查评估信息表"}>
				<Form>
					<Form.Item label="委托单位">
						<Input placeholder={selectTask.name} />
					</Form.Item>
					<Form.Item label="委托调查函">
						<TextArea placeholder={"请输入委托调查函"} />
					</Form.Item>
					<Form.Item label="被调查评估对象信息">
						<Space direction={"vertical"}>
							<Space>
								<Select defaultValue="其他" style={{ width: 120 }}>
									<Select.Option value="01">被告人</Select.Option>
									<Select.Option value="02">罪犯</Select.Option>
									<Select.Option value="99">其他</Select.Option>
								</Select>
								<Input placeholder={"请输入姓名"} />
								<Select defaultValue="男" style={{ width: 120 }}>
									<Select.Option value="male">男</Select.Option>
									<Select.Option value="female">女</Select.Option>
								</Select>
							</Space>
							<Input placeholder={"请输入身份证"} />
							<Input placeholder={"请输入居住地址"} />
							<Input placeholder={"请输入工作单位"} />
						</Space>

					</Form.Item>

					<Form.Item label="刑罚信息">
						<Space direction={"vertical"}>
							<Space>
								<Input placeholder={"请输入罪名"} />
								<Input placeholder={"请输入原判刑期"} />
								<RangePicker />
							</Space>

							<Space>
								<Input placeholder={"请输入原判刑罚"} />
								<TextArea style={{ width: 400 }} placeholder={"请输入附加刑"} />
							</Space>
							<Space>
								<Input placeholder={"请输入判决机关"} />
								<DatePicker />
							</Space>

						</Space>

					</Form.Item>

					<Form.Item label={"调查评估信息"}>
						<Space direction={"vertical"}>
							<Space>
								<Input placeholder={"请输入矫正类别"} />
								<Input style={{ width: 300 }} placeholder={"请输入接受委托的县级矫正机构"} />
							</Space>

							<Space>
								<TextArea style={{ width: 500 }} placeholder={"请输入调查评估意见"} />
							</Space>
							<Space>
								<Input placeholder={"请输入调查意见审核人"} />
							</Space>
							<Space>
								<TextArea style={{ width: 500 }} placeholder={"请输入调查评估意见书"} />
							</Space>
						</Space>
					</Form.Item>
				</Form>
			</Card>
			<Card title={"调查评估走访信息表"}>
				<Form>
					<Form.Item label="被调查评估对象信息">
						<Space direction={"vertical"}>
							<Space>
								<Input placeholder={"请输入姓名"} />
							</Space>
							<Input placeholder={"与被调查评估对象关系"} />
						</Space>

					</Form.Item>

					<Form.Item label="调查信息">
						<Space direction={"vertical"}>
							<Space>
								<Input placeholder={"调查事项"} />
								<Input placeholder={"调查时间"} />
								<RangePicker />
							</Space>

							<Space>
								<Input placeholder={"调查地点"} />
							</Space>
							<Space>
								<Input placeholder={"调查单位"} />
								<DatePicker />
								<Input placeholder={"调查人"} />
							</Space>

						</Space>

					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default TaskInfo;