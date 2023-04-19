import { Button, message, Steps, theme } from "antd";
import React, { useState } from "react";

const TemplateSteps = (props: { steps: any[]; step?: number }) => {
	const { steps, step } = props;
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(step ? step : 0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	const contentStyle: React.CSSProperties = {
		lineHeight: "260px",
		textAlign: "center",
		color: token.colorTextTertiary,
		backgroundColor: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		border: `1px dashed ${token.colorBorder}`,
		marginTop: 16,
	};

	return (
		<>
			<Steps current={current} items={items} />
			<div style={contentStyle}>{steps[current].content}</div>
			<div style={{ marginTop: 24 }}>
				{current < steps.length - 1 && (
					<Button
						type="primary"
						disabled={!steps[current].check(current)}
						onClick={() => {
							steps[current].nextAction(current);
							next();
						}}>
						下一步
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button
						type="primary"
						onClick={() =>
							message.success("Processing complete!")
						}>
						完成
					</Button>
				)}
				{current > 0 && (
					<Button
						style={{ margin: "0 8px" }}
						onClick={() => prev()}>
						上一步
					</Button>
				)}
			</div>
		</>
	);
};

export default TemplateSteps;
