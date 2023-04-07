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
	} = props;

	useEffect(() => {
		if (recordId) {
			getAPI(recordId);
		}
	}, [recordId, infoUpdate]);

	return (
		<Modal
			style={{ top: 20 }}
			open={open}
			width={1000}
			confirmLoading={confirmLoading}
			onOk={onOk != undefined ? onOk : () => setOpen(false)}
			onCancel={
				onCancel != undefined
					? onCancel
					: () => setOpen(false)
			}>
			<Card>
				<Space direction={"vertical"}>
					<Card hoverable style={{ width: "900px" }}>
						{InfoDescriptions}
					</Card>
				</Space>
			</Card>
		</Modal>
	);
}
