import React from "react";
import Tabs from "./Tabs";
import Tooltip from "./Tooltip";

class MyNotes extends React.Component {
  render() {
    return (
      <div className="App">
        <Tooltip />
        <Tabs />
      </div>
    );
  }
}

export default MyNotes;
