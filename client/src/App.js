
import './App.css';
import LandingPage from "./components/LandingPage/LandingPage";
import Form from './components/Form/Form';
import { BrowserRouter, Routes , Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    
      <Route exact path="/" element={<LandingPage/>}></Route>
      <Route path="/Form" element={<Form/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
