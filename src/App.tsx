import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import Layout from "./layout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
