import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/ie/api": {
				target: "http://localhost:9006",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/ie\/api/, "/ie"),
			},
			"/ic/api": {
				target: "http://localhost:9007",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/ic\/api/, "/ic"),
			},
			"/noexit/api": {
				target: "http://localhost:9008",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/noexit\/api/, "/noexit"),
			},
			"/cate/api": {
				target: "http://localhost:9009",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/cate\/api/, "/cate"),
			},
			"/daily/api": {
				target: "http://localhost:9010",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/daily\/api/, "/daily"),
			},
			"/assess/api": {
				target: "http://localhost:9011",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/assess\/api/, "/assess"),
			},
			"/business/api": {
				target: "http://localhost:9012",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/business\/api/, "/business"),
			},
			"/termination/api": {
				target: "http://localhost:9013",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(
						/^\/termination\/api/,
						"/termination"
					),
			},
			"/uncorrected/api": {
				target: "http://localhost:9014",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(
						/^\/uncorrected\/api/,
						"/uncorrected"
					),
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
