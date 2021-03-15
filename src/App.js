import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Calendar from "./Components/Calendar/Calendar";
import "./App.scss";
import EventCreate from "./Components/EventCreate/EventCreate";
import Loader from "./Components/Loader/Loader";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Loader} />
        <Route path="/login" component={Login} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/newEvent" component={EventCreate} />
      </Router>
    </div>
  )
};

export default App;
