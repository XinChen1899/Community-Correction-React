import axios from "axios";

export const api = axios.create({
	baseURL: "/assess/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});
