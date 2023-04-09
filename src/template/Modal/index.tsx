import { Modal, Card, Space } from "antd";
import { useEffect } from "react";

export default function TemplateModal(props: {
	InfoDescriptions: any;
	open: boolean;
	setOpen: any;
	getAPI: any;
	onOk?: any;
	onCancel?: any;
	confirmLoading?: boolean;
	recordId: any;
	infoUpdate?: any;
	title?: string;
}) {
	const {
		open,
		setOpen,
		recordId,
		getAPI,
		infoUpdate,
		InfoDescriptions,
		confirmLoading,
		onOk,
		onCancel,
		title,
	} = props;

	useEffect(() => {
		if (recordId && getAPI) {
			getAPI(recordId);
		}
	}, [recordId, infoUpdate]);

	return (
		<Modal
			style={{ top: 20 }}
			title={title}
			centered
			open={open}
			width={980}
			confirmLoading={confirmLoading}
			onOk={onOk != undefined ? onOk : () => setOpen(false)}
			onCancel={
				onCancel != undefined
					? onCancel
					: () => setOpen(false)
			}>
			<Space direction={"vertical"}>
				<Card hoverable style={{ width: "900px" }}>
					{InfoDescriptions}
				</Card>
			</Space>
		</Modal>
	);
}
