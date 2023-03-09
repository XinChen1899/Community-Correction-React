import React from "react";
import { Card, DatePicker, Form, Input, Modal, Select } from "antd";
import { Space } from "antd/lib";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TaskAddModal = (props: { open: boolean, setOpen: any }) => {
	const { setOpen, open } = props;
	const handleCancel = () => {
		setOpen(false);
	};
	return (
		<Modal width={1000}
			   open={open}
			   title={"新增调查评估"}
			   onCancel={handleCancel}>
			<Card title={"调查评估信息表"}>
				<Form>
					<Form.Item label="委托单位">
						<Input placeholder={"请输入委托单位"} />
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
					{/*<Form.Item label="Checkbox" name="disabled" valuePropName="checked">*/}
					{/*	<Checkbox>Checkbox</Checkbox>*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="Radio">*/}
					{/*	<Radio.Group>*/}
					{/*		<Radio value="apple"> Apple </Radio>*/}
					{/*		<Radio value="pear"> Pear </Radio>*/}
					{/*	</Radio.Group>*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="Input">*/}
					{/*	<Input />*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="Select">*/}
					{/*	<Select>*/}
					{/*		<Select.Option value="demo">Demo</Select.Option>*/}
					{/*	</Select>*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="TreeSelect">*/}
					{/*	<TreeSelect*/}
					{/*		treeData={[*/}
					{/*			{ title: "Light", value: "light", children: [{ title: "Bamboo", value: "bamboo" }] }*/}
					{/*		]}*/}
					{/*	/>*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="Cascader">*/}
					{/*	<Cascader*/}
					{/*		options={[*/}
					{/*			{*/}
					{/*				value: "zhejiang",*/}
					{/*				label: "Zhejiang",*/}
					{/*				children: [*/}
					{/*					{*/}
					{/*						value: "hangzhou",*/}
					{/*						label: "Hangzhou"*/}
					{/*					}*/}
					{/*				]*/}
					{/*			}*/}
					{/*		]}*/}
					{/*	/>*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="DatePicker">*/}
					{/*	<DatePicker />*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="RangePicker">*/}
					{/*	<RangePicker />*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="InputNumber">*/}
					{/*	<InputNumber />*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="TextArea">*/}
					{/*	<TextArea rows={4} />*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="Switch" valuePropName="checked">*/}
					{/*	<Switch />*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="Upload" valuePropName="fileList">*/}
					{/*	<Upload action="/upload.do" listType="picture-card">*/}
					{/*		<div>*/}
					{/*			<PlusOutlined />*/}
					{/*			<div style={{ marginTop: 8 }}>Upload</div>*/}
					{/*		</div>*/}
					{/*	</Upload>*/}
					{/*</Form.Item>*/}
					{/*<Form.Item label="Button">*/}
					{/*	<Button>Button</Button>*/}
					{/*</Form.Item>*/}
				</Form>
			</Card>
		</Modal>
	);
};

export default TaskAddModal;