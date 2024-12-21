import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {

  return (
    <div className="flex min-h-screen w-screen flex-col font-roboto">
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>

    </div>
  );
}

export default App;

