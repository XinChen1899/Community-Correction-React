import React from "react";
import Layout from "./layout";
import { Routes } from "react-router-dom";
import { Routers } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<Routes>{Routers}</Routes>
			</Layout>
		</QueryClientProvider>
	);
};

export default App;
