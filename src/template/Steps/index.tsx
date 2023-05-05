import { Button, message, Steps, theme } from "antd";
import React, { useEffect, useState } from "react";

const TemplateSteps = (props: { steps: any[]; step: number }) => {
	const { steps, step } = props;
	const { token } = theme.useToken();

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
	useEffect(() => {
		if (current != step) setCurrent(step);
	}, [step]);
	const [current, setCurrent] = useState(step);
	// console.log(step, current, steps[current]);
	return (
		<>
			<Steps current={current} items={items} />
			<div style={contentStyle}>
				{steps[current] && steps[current].content}
			</div>
			<div style={{ marginTop: 24 }}>
				{steps[current] && steps[current].store && (
					<Button
						type="primary"
						style={{ margin: "0 8px" }}
						onClick={() => {
							steps[current].onStore(current);
						}}>
						保存
					</Button>
				)}
				{current < steps.length - 1 && (
					<Button
						type="primary"
						disabled={!steps[current].check(current)}
						onClick={() => {
							if (steps[current].nextAction) {
								steps[current].nextAction();
							}
							next();
							// steps[current].nextAction(current, next);
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
