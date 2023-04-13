import React from "react";
import Layout from "./layout";
import { Routes } from "react-router-dom";
import { Routers } from "./router";

const App: React.FC = () => {
	return (
		<Layout>
			<Routes>{Routers}</Routes>
		</Layout>
	);
};

export default App;
