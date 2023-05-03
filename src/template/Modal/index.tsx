import { Card, Modal, Space } from "antd";

export default function TemplateModal(props: {
	InfoDescriptions: JSX.Element;
	open: boolean;
	setOpen: any;
	onOk?: () => void;
	onCancel?: () => void;
	confirmLoading?: boolean;
	title?: string;
	children?: JSX.Element;
	footer?: JSX.Element[];
}) {
	const {
		open,
		setOpen,
		InfoDescriptions,
		confirmLoading,
		onOk,
		onCancel,
		title,
		children,
		footer,
	} = props;

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
			}
			footer={footer}>
			<Space direction={"vertical"}>
				<Card hoverable style={{ width: "900px" }}>
					{InfoDescriptions}
				</Card>
				{children}
			</Space>
		</Modal>
	);
}
