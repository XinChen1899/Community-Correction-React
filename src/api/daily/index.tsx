import axios from "axios";

export const api = axios.create({
	baseURL: "/daily/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});
