import React from "react";
import Layout from "./layout";
import { Routes } from "react-router-dom";
import { RouterData } from "@/router/config";

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>
				{RouterData}
			</Routes>
		</Layout>
	);
};

export default App;
