import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cat from "./pages/Cat";
import CatSection from "./components/CatSection"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cats" element={<Cat />} />
        {/* <Route path="/cats/:number" element={<CatSection />}/> */}
      </Routes>
    </div>
  );
}

export default App;
