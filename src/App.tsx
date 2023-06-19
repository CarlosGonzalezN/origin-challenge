import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Stocks";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/:symbol" element={<Detail />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}

export default App;
