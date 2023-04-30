import axios from "axios";

export const api = axios.create({
	baseURL: "/api/business",
	headers: { "Access-Control-Allow-Origin": "*" },
});
