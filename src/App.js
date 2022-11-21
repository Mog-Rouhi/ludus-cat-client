import "./App.css";
import { Routes, Route } from "react-router-dom";
import Cat from "./pages/Cat";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import 'semantic-ui-css/semantic.min.css'


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cats" element={<Cat />} />
      </Routes>
    </div>
  );
}

export default App;
