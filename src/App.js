import React from "react";
import "./App.scss";
import Controls from "./Components/Header/Controls";
import Table from "./Components/Table/Table";

function App() {
  return (
    <div className="App active">
      <Controls />
      <Table />
    </div>
  )
};

export default App;
