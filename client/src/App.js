
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";

import Form from "./Components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/Home" element={<Home />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
