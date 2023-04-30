import { ColumnType } from "antd/lib/table";

export function getColumn<T>(
	title: string,
	key: string,
	render?: (value: T, record: T) => JSX.Element
) {
	return {
		title: title,
		dataIndex: key,
		key,
		align: "center",
		render,
	} as ColumnType<T>;
}
