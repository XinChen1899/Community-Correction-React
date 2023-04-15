import axios from "axios";
import { ServerTable } from "..";

export const api = axios.create({
	baseURL: `${ServerTable.assessment}`,
	headers: { "Access-Control-Allow-Origin": "*" },
});
