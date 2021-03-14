import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Calendar from "./Components/Calendar/Calendar";
import "./App.scss";
import EventCreate from "./Components/EventCreate/EventCreate";

function App() {
  return (
    <div className="App active">
      <Router>
        <Route exact path="/" component={Calendar} />
        <Route path="/newEvent" component={EventCreate} />
      </Router>
    </div>
  )
};

export default App;
