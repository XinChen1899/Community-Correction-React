import axios from "axios";
import { ServerTable } from "..";

export const api = axios.create({
	baseURL: `${ServerTable.daily}/daily`,
	headers: { "Access-Control-Allow-Origin": "*" },
});
