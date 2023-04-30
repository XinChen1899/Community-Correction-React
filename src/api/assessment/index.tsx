import axios from "axios";

export const api = axios.create({
	baseURL: "/api/assess",
	headers: { "Access-Control-Allow-Origin": "*" },
});
