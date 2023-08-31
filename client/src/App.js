



    

import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Cards from './Components/Cards/Cards';
import cars from './data.js'

import Form from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/Home" element={<Home />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
      </Routes>
    </BrowserRouter>
 <div className="App">
      <div>
        <Cards
        cars={cars}
        ></Cards>
      </div>
    </div>

  );
}

export default App;
