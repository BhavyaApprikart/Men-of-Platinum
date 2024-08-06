import { useState } from "react";

import "./App.css";
import Layout from "./components/Layout";
import Splash from "./pages/Splash";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Splash2 from "./pages/Splash2";
import Message from "./pages/Message";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  exact path="/" element={<Layout />}>
          <Route path="/"  element={<Splash />} />
          <Route path="/Splash2" element={<Splash2 />} />
          <Route path="/message" element={<Message />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
