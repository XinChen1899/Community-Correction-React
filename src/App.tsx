import React from "react";
import { Routes } from "react-router-dom";
import Layout from "./layout";
import { Routers } from "./router";

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>{Routers}</Routes>
		</Layout>
	);
};

export default App;
