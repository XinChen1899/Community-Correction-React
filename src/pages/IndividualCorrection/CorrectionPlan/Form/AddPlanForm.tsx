import {
	download,
	downloadTemplate,
	exportPlan,
	uploadDocx,
} from "@/api/ic/crplan";
import { getAllCrt } from "@/api/ic/crteam";
import { CrTeam } from "@/entity/IC/CrTeam";
import { CodeMap, generateSelect } from "@/utils";
import { UploadOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import {
	Button,
	Form,
	FormInstance,
	Input,
	Space,
	message,
} from "antd";
import Upload, { UploadFile, UploadProps } from "antd/es/upload";
import { useState } from "react";

export function AddPlanForm(props: {
	form: FormInstance<any>;
	onFinish: any;
	initialValues: any;
	disabled?: boolean;
}) {
	const { form, onFinish, initialValues, disabled } = props;

	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const { run: runUploadDocx } = useRequest(
		(docx) => uploadDocx(docx),
		{
			onSuccess: ({ data }) => {
				console.log(data);
				if (data.status == "200") {
					const url = data.data.split("/");
					const name = url[url.length - 1];
					const after = {
						uid: url,
						name,
						status: "done",
						url: data.data,
						percent: 100,
					} as UploadFile;
					form.setFieldValue("zz", data.data);
					setFileList([after]);
				} else {
					message.error("上传失败!" + data.message);
				}
			},
			onError: (error: any) => {
				message.error(error);
			},
			manual: true,
		}
	);

	const uploadProps: UploadProps = {
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		fileList,
	};

	const { run: runDownloadTemplate } = useRequest(
		() => downloadTemplate(),
		{
			onSuccess: ({ data }) => {
				message.success("下载成功!");
				download(data, initialValues.dxbh + "方案模板.docx");
			},
			manual: true,
			debounceWait: 500,
		}
	);

	const { run: runDownloadDocx } = useRequest(
		(name) => downloadTemplate(name),
		{
			onSuccess: ({ data }) => {
				message.success("下载成功!");
				download(data, initialValues.dxbh + "方案.doc");
			},
			manual: true,
			debounceWait: 500,
		}
	);

	const { run: runExport } = useRequest(
		(info) => exportPlan(info),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200") {
					runDownloadDocx(data.data);
				}
			},
			manual: true,
		}
	);

	const customRequest = (options: any) => {
		const { file } = options;
		const imgItem = {
			uid: file.uid,
			name: file.name,
			status: "uploading",
			url: "",
			percent: 99,
		} as UploadFile;
		setFileList([imgItem]);
		console.log(file);

		runUploadDocx(file);
	};

	// 获取所有的矫正小组信息
	const [teamList, setTeamList] = useState<CodeMap[]>([]);
	useRequest(getAllCrt, {
		onSuccess: ({ data }) => {
			if (data.status == "200") {
				const temp = data.data.map((team: CrTeam) => {
					return {
						code: team.id,
						value: team.name,
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
			<Form.Item
				name={"dxbh"}
				label={"社区矫正对象编号"}
				rules={[
					{
						required: true,
					},
				]}>
				<Input
					placeholder={"请输入社区矫正对象编号"}
					disabled={disabled}
				/>
			</Form.Item>
			<Form.Item
				name={"famc"}
				label={"方案名称"}
				rules={[
					{
						required: true,
					},
				]}>
				<Input placeholder={"请输入方案名称"} />
			</Form.Item>
			<Form.Item
				name={"team"}
				label="确定矫正小组"
				rules={[
					{
						required: true,
					},
				]}>
				{generateSelect(teamList)}
			</Form.Item>
			<Form.Item label="矫正方案上传">
				<Space>
					<Button
						type="link"
						onClick={() => runExport(initialValues)}>
						模板下载
					</Button>

					<Upload
						{...uploadProps}
						customRequest={customRequest}>
						<Button icon={<UploadOutlined />}>
							上传矫正方案
						</Button>
					</Upload>
					{initialValues.plan && (
						<Button
							type="link"
							onClick={() =>
								runDownloadDocx(initialValues.plan)
							}>
							下载矫正方案
						</Button>
					)}
				</Space>
			</Form.Item>
		</Form>
	);
}
