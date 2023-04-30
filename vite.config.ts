import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

//! 网关ip
const GATEWAY_IP = "http://localhost:9099";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: GATEWAY_IP,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
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
