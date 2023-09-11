import React from "react";
import ReactDOM from "react-dom"; // Cambia esta línea

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const root = document.getElementById("root"); // Cambia esta línea
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  root
);

// Resto de tu código
reportWebVitals();
