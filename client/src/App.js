import Cards from './Components/Cards/Cards';
import cars from './data.js'
import './App.css';

function App() {
  return (
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
