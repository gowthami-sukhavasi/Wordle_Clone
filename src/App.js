import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Wordle from "./components/Wordle";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Wordle />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
