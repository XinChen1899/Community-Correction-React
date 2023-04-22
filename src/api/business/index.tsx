import axios from "axios";

export const api = axios.create({
	baseURL: "/business/api",
	headers: { "Access-Control-Allow-Origin": "*" },
});
