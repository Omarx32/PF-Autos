
import './App.css';
import LandingPage from "./components/LandingPage/LandingPage";
import { BrowserRouter, Routes , Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
      <Route exact path="/" element={<LandingPage/>}></Route>
   
    </Routes>
  </BrowserRouter>
  );
}

export default App;
