import { Dayjs } from "dayjs";

const getDateFromDayjs = (date: Dayjs | string) => {
	if (date != null && date != undefined && typeof date != "string") {
		return `${date.year()}-${date.month() + 1}-${date.date()}`;
	} else if (typeof date == "string") {
		return date;
	} else {
		return "";
	}
};

export { getDateFromDayjs };
