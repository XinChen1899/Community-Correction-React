import "react";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Select,
	Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
	bdcpgrdlxMap,
	fjxMap,
	generateSelect,
	nsyjzlbMap,
	pjjgMap,
	wtdwMap,
	xbMap,
	ypxfMap,
	zmMap,
} from "@/utils";

const { TextArea } = Input;

export function IEInfoForm(props: {
	form: any;
	onFinish: any;
	initialValues: any;
}) {
	const { form, onFinish, initialValues } = props;
	return (
		<Form
			form={form}
			onFinish={onFinish}
			initialValues={initialValues}>
			<Form.Item name={"wtbh"} label={"委托编号"}>
				<Input disabled />
			</Form.Item>
			<Form.Item name={"wtdw"} label="委托单位">
				{generateSelect(wtdwMap)}
			</Form.Item>
			<Form.Item name={"wtdch"} label="委托调查函">
				<TextArea placeholder={"请输入委托调查函"} />
			</Form.Item>
			<Form.Item
				name={"bdcpgrdlx"}
				label="被调查评估对象的类型">
				{generateSelect(bdcpgrdlxMap)}
			</Form.Item>
			<Form.Item name={"bgrxm"} label="被调查评估对象姓名">
				<Input placeholder={"请输入姓名"} />
			</Form.Item>
			<Form.Item name={"bgrxb"} label="被调查评估对象性别">
				{generateSelect(xbMap)}
			</Form.Item>
			<Form.Item
				name={"bgrsfzh"}
				label="被调查评估对象的身份证号">
				<Input placeholder={"请输入身份证"} />
			</Form.Item>
			<Form.Item
				name={"bgrcsrq"}
				label="被调查评估对象出生日期">
				<DatePicker />
			</Form.Item>
			<Form.Item
				name={"bgrjzddz"}
				label="被调查评估对象居住地地址">
				<Input placeholder={"请输入居住地址"} />
			</Form.Item>
			<Form.Item
				name={"bgrgzdw"}
				label="被调查评估对象工作单位">
				<Input placeholder={"请输入工作单位"} />
			</Form.Item>
			<Form.Item name={"zm"} label="罪名">
				{generateSelect(zmMap)}
			</Form.Item>
			<Form.Item name={"ypxq"} label="原判刑期">
				<Input placeholder={"请输入原判刑期"} />
			</Form.Item>
			<Form.Item name={"ypxqksrq"} label="原判刑期开始日期">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"ypxqjsrq"} label="原判刑期结束日期">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"ypxf"} label="原判刑罚">
				{generateSelect(ypxfMap)}
			</Form.Item>
			<Form.Item name={"fjx"} label="附加刑">
				{generateSelect(fjxMap)}
			</Form.Item>
			<Form.Item name={"pjjg"} label="判决机关">
				{generateSelect(pjjgMap)}
			</Form.Item>
			<Form.Item name={"pjrq"} label="判决日期">
				<DatePicker />
			</Form.Item>
			<Form.Item name={"nsyjzlb"} label="拟适用矫正类别">
				{generateSelect(nsyjzlbMap)}
			</Form.Item>

			<Form.Item
				name={"dcdwxqj"}
				label="接受委托的县级社区矫正机构">
				<Input
					style={{ width: 300 }}
					placeholder={"请输入接受委托的县级矫正机构"}
				/>
			</Form.Item>

			<Form.Item name={"dcpgyj"} label="调查评估意见">
				<TextArea
					style={{ width: 500 }}
					placeholder={"请输入调查评估意见"}
				/>
			</Form.Item>

			<Form.Item name={"dcyjshr"} label="调查评估意见审核人">
				<Input placeholder={"请输入调查意见审核人"} />
			</Form.Item>

			<Form.Item name={"dcpgyjs"} label="调查评估意见书">
				<Form.Item>
					<Upload
						name="yjs"
						action="/upload.do"
						listType="picture">
						<Button icon={<UploadOutlined />}>
							Click to upload
						</Button>
					</Upload>
				</Form.Item>
			</Form.Item>
		</Form>
	);
}
