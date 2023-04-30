import axios from "axios";

export const api = axios.create({
	baseURL: "/api/daily",
	headers: { "Access-Control-Allow-Origin": "*" },
});
