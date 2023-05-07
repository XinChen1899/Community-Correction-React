import TemplateTag, { MyTagType } from "../Tag";

export function Audio(props: { src: string }) {
	const { src } = props;
	return (
		<div>
			{src ? (
				<audio controls src={src}>
					<a href={src}>下载音频</a>
				</audio>
			) : (
				<TemplateTag
					value={"请上传音频!"}
					type={MyTagType.Refuse}
				/>
			)}
		</div>
	);
}
