import { Worker } from "@/entity/IC/Worker";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Tag } from "antd";
import "react";

const formItemLayout = {
	labelCol: {
		xs: { span: 0 },
		sm: { span: 0 },
	},
	wrapperCol: {
		xs: { span: 0 },
		sm: { span: 0 },
	},
};

const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 0, offset: 2 },
		sm: { span: 0, offset: 2 },
	},
};

export function AddTeamForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
	worker: any[];
}) {
	const { form, onFinish, initialValues, worker } = props;

	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"name"} label={"矫正小组名"}>
				<Input placeholder={"请输入矫正小组名"} />
			</Form.Item>
			<Form.Item name={"monitor"} label="选择小组队长">
				<Select style={{ width: 180 }}>
					{worker?.map((item: Worker) => {
						return (
							<Select.Option
								value={item.id}
								key={item.id}>
								{item.xm} 所属小队:
								<Tag>{item.team}</Tag>
							</Select.Option>
						);
					})}
				</Select>
			</Form.Item>
			<Form.List
				name="workers"
				rules={[
					{
						validator: async (_, names) => {
							if (!names || names.length < 1) {
								return Promise.reject(
									new Error("At least 1 passengers")
								);
							}
						},
					},
				]}>
				{(fields, { add, remove }, { errors }) => (
					<>
						{fields.map((field, index) => (
							<Form.Item
								{...(index === 0
									? formItemLayout
									: formItemLayoutWithOutLabel)}
								label={
									index === 0
										? "小组成员"
										: field.name
								}
								required={false}
								key={field.key}>
								<Form.Item
									{...field}
									validateTrigger={[
										"onChange",
										"onBlur",
									]}
									rules={[
										{
											required: true,
											whitespace: true,
											message:
												"Please input passenger's name or delete this field.",
										},
									]}
									noStyle>
									<Select style={{ width: 180 }}>
										{worker?.map(
											(item: Worker) => {
												return (
													<Select.Option
														value={
															item.id
														}
														key={item.id}>
														{item.xm}{" "}
														所属小队:
														<Tag>
															{
																item.team
															}
														</Tag>
													</Select.Option>
												);
											}
										)}
									</Select>
								</Form.Item>
								{fields.length > 1 ? (
									<MinusCircleOutlined
										className="dynamic-delete-button"
										onClick={() =>
											remove(field.name)
										}
									/>
								) : null}
							</Form.Item>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => add()}
								style={{ width: "60%" }}
								icon={<PlusOutlined />}>
								添加小组成员
							</Button>

							<Form.ErrorList errors={errors} />
						</Form.Item>
					</>
				)}
			</Form.List>
		</Form>
	);
}
