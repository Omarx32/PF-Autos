import "./App.css";
import LandingPage from "./Components/Views/LandingPage/LandingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Views/Home/Home";
import Detail from "./Components/Views/Detail/Detail";
import Form from "./Components/Views/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/Home" element={<Home />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
        <Route exact path="/Detail/:idCar" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
