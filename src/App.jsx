import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Splash from "./pages/Splash";
import Message from "./pages/Message";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Splash />} />
          <Route path="message" element={<Message />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
