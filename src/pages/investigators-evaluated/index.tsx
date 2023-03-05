import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Modal,
	Row,
	Space,
	Steps
} from "antd";
import {
	LoadingOutlined,
	SmileOutlined,
	SolutionOutlined,
	UserOutlined
} from "@ant-design/icons";

import Table, { ColumnsType } from "antd/es/table";
import "react";
import { MutableRefObject, useEffect, useRef, useState } from "react";

/**
 * 调查评估:
 * 功能:
 * 1.新增调查评估任务。
 * 2.查询所有调查评估任务记录。
 * 3.（县级）向委托方确认收到，接受或退回，通知监督方，向司法所指派任务；（所级）确认收到任务。
 * 4.《评估意见书》编辑、提交委托方、抄送检察院。
 * 5. 查看流程节点记录。
 */

interface DataType {
	key: string;
	name: string;
	age: number;
	sex: string;
	address: string;
	tags: string[];
}


const columns: ColumnsType<DataType> = [
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>
	},
	{
		title: "年龄",
		dataIndex: "age",
		key: "age"
	},
	{
		title: "性别",
		dataIndex: "sex",
		key: "sex"
	},
	{
		title: "家庭住址",
		dataIndex: "address",
		key: "address"
	},
	{
		title: "操作",
		key: "action",
		render: (_, record) => {
			return (
				<Space size="middle">
					<a
						onClick={() => {
							person = record;
						}}
					>
						查看调查报告 {record.name}
					</a>
				</Space>
			);
		}
	}
];

const data: DataType[] = [
	{
		key: "1",
		name: "张三",
		age: 32,
		sex: "男",
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"]
	},
	{
		key: "2",
		name: "李四",
		age: 42,
		sex: "男",
		address: "London No. 1 Lake Park",
		tags: ["loser"]
	},
	{
		key: "3",
		name: "王五",
		age: 32,
		sex: "女",
		address: "Sydney No. 1 Lake Park",
		tags: ["cool", "teacher"]
	}
];

// 当前点击的对象，设置为全局对象
let person: DataType;
export default function Hello() {
	const [form] = Form.useForm();
	const [, forceUpdate] = useState({});
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	// 获取点击获取详情的人员信息  person.current
	// const person: MutableRefObject<any> = useRef(null);

	// To disable submit button at the beginning.
	useEffect(() => {
		forceUpdate({});
	}, []);
	// 表单提交后执行
	const onFinish = (values: any) => {
		console.log("Finish:", values);
	};
	// 打开对话框
	const showModal = () => {
		setOpen(true);
	};
	// 点击对话框的Ok按钮
	const handleOk = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setOpen(false);
		}, 3000);
	};
	// 点击对话框的取消按钮
	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<div>
			<div>
				<Space
					direction="vertical"
					size="middle"
					style={{ display: "flex" }}
				>
					<h2>调查评估</h2>
					{/* 操作区 */}
					<div style={{ padding: "0px 15px" }}>
						<Form
							form={form}
							name="search"
							layout="inline"
							onFinish={onFinish}
						>
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: "请输入矫正对象姓名"
									}
								]}
							>
								<Input placeholder="请输入矫正对象姓名" />
							</Form.Item>

							<Form.Item shouldUpdate>
								{() => (
									<>
										<Space>
											<Button
												type="primary"
												htmlType="submit"
												disabled={
													!form.isFieldsTouched(
														true
													) ||
													!!form
														.getFieldsError()
														.filter(
															({
																 errors
															 }) =>
																errors.length
														).length
												}
											>
												查询
											</Button>

											<Button type="primary">
												新增调查评估
											</Button>
										</Space>
									</>
								)}
							</Form.Item>
						</Form>
					</div>

					{/* // 显示调查报告的列表 */}
					<Table
						columns={columns}
						dataSource={data}
						onRow={(record) => {
							return {
								onClick: (event) => {
									person = record;
									// console.log(record);
									showModal();
								} // 点击行
							};
						}}
					/>
				</Space>
				{/* 显示详情 */}
				<Modal
					open={open}
					width={1000}
					title={person ? person.name + "的调查报告" : "null"}
					onOk={handleOk}
					onCancel={handleCancel}
					footer={[
						<Button key="back" onClick={handleCancel}>
							返回
						</Button>
					]}
				>
					<Card>
						<Row>
							<Space>
								<Col>
									<Card
										style={{
											width: "250px",
											textAlign: "center"
										}}
										cover={
											<img
												alt="example"
												src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
											/>
										}
									>
										<Card.Meta
											title={
												person
													? person.name
													: "null"
											}
										/>
									</Card>
								</Col>
								<Col>
									<Card>个人信息</Card>
								</Col>
							</Space>
						</Row>

						<Row>
							<Card
								title="调查报告流程"
								hoverable
								style={{ width: "950px" }}
							>
								<Steps
									items={[
										{
											title: "Login",
											status: "finish",
											icon: <UserOutlined />
										},
										{
											title: "Verification",
											status: "finish",
											icon: <SolutionOutlined />
										},
										{
											title: "Pay",
											status: "process",
											icon: <LoadingOutlined />
										},
										{
											title: "Done",
											status: "wait",
											icon: <SmileOutlined />
										}
									]}
								/>
							</Card>
						</Row>
					</Card>
				</Modal>
			</div>
		</div>
	);
}
