import { Card, Form } from "antd";

import { saveCrt } from "@/api/ic/crteam";
import { CrTeam } from "@/entity/IC/CrTeam";
import TemplateModal from "@/template/Modal";
import { GMessage } from "@/utils/msg/GMsg";
import { useRequest } from "ahooks";
import { AddTeamForm } from "../../Form/AddTeamForm";

const AddTeamModal = (props: {
	open: boolean;
	setOpen: any;
	gMsg: GMessage;
	tableUpdate: boolean;
	setTableUpdate: any;
	worker: any;
}) => {
	const {
		setOpen,
		open,
		gMsg,
		tableUpdate,
		setTableUpdate,
		worker,
	} = props;

	const [form] = Form.useForm();

	const handleOk = () => {
		form.submit();
	};

	const { loading, run } = useRequest(
		(detail: CrTeam) => saveCrt(detail),
		{
			onSuccess: ({ data }) => {
				if (data.status == "200" && data.data == true) {
					setTableUpdate(!tableUpdate);
					gMsg.onSuccess("新增小组");
				} else {
					gMsg.onError(data.message);
				}
			},
			onError: (err) => {
				gMsg.onError(err);
			},
			onFinally: () => {
				setOpen(false);
			},
			manual: true,
			debounceWait: 300,
		}
	);

	// 提交表单时操作
	const onFinish = (values: any) => {
		const cteam = values as CrTeam;
		cteam.teamNumber = cteam.workers.length + 1;
		cteam.workers.push(cteam.monitor);

		run(cteam);
	};

	return (
		<>
			<TemplateModal
				InfoDescriptions={
					<Card title={"新增矫正小组"} hoverable>
						<AddTeamForm
							form={form}
							onFinish={onFinish}
							initialValues={{}}
							worker={worker}
						/>
					</Card>
				}
				onOk={handleOk}
				open={open}
				setOpen={setOpen}
				confirmLoading={loading}
			/>
		</>
	);
};

export default AddTeamModal;
