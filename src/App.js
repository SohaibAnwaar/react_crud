import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import { Input } from "./components/Pages/Input";
import { Output } from "./components/Pages/Output";


function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Input />} />
            <Route path="/output" element={<Output />} />

          </Routes>
        </div>
      </Router>
  </>
  );
}

export default App;
