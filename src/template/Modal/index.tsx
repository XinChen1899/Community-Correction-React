import { Card, Modal, Space } from "antd";

export function HintModal(props: {
	open: boolean;
	setOpen: any;
	hint: JSX.Element | string;
	title?: string;
	confirmLoading?: boolean;
	onOk?: () => void;
	onCancel?: () => void;
}) {
	const {
		open,
		setOpen,
		title,
		confirmLoading,
		onOk,
		onCancel,
		hint,
	} = props;
	return (
		<Modal
			style={{ top: 20 }}
			title={title}
			centered
			open={open}
			closable={false}
			confirmLoading={confirmLoading}
			onOk={onOk != undefined ? onOk : () => setOpen(false)}
			onCancel={
				onCancel != undefined
					? onCancel
					: () => setOpen(false)
			}>
			{hint}
			{/* <Card hoverable>{hint}</Card> */}
		</Modal>
	);
}

export default function TemplateModal(props: {
	InfoDescriptions: JSX.Element | string;
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
			confirmLoading={confirmLoading}
			onOk={onOk != undefined ? onOk : () => setOpen(false)}
			onCancel={
				onCancel != undefined
					? onCancel
					: () => setOpen(false)
			}
			closable={false}
			footer={footer}>
			<Card hoverable style={{ width: "100%" }}>
				{InfoDescriptions}
			</Card>
			<Space direction={"vertical"}>{children}</Space>
		</Modal>
	);
}
