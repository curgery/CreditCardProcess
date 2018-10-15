import React from "react";
import ReactDOM from "react-dom";
import CreditCardForm from "./components/CreditCardForm";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <CreditCardForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
