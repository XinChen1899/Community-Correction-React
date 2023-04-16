import { ServerTable } from "@/api";
import axios from "axios";

export const api = axios.create({
	baseURL: `${ServerTable.business}/business`,
	headers: { "Access-Control-Allow-Origin": "*" },
});
