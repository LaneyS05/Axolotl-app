import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AxolotlIndex from "./AxoltlDisplay/AxolotlIndex";
//import Home from "./Components/Display";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/all" component={AxolotlIndex} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
