import "./App.css";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Cat from "./pages/Cat";


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Search />} /> */}
        <Route path="/cats" element={<Cat />} />
        {/* <Route path="/cats/:number" element={<CatSection />}/> */}
      </Routes>
    </div>
  );
}

export default App;
