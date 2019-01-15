import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppBar from "../src/components/AppBar";
import Routes from "../src/components/Routes";
import "../src/index.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Routes />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
