import Canvas from "../Canvas";
import React from "react";
import "./SubmitStyles.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="grid-container">
        <div>TIMER</div>
        <div className="block">
          <label>Player1</label>
        </div>
        <div className="block">
          <label>Player2</label>
        </div>
        <div className="block">
          <label>Budget</label>
        </div>
        <div>
          <Canvas />
        </div>
        <div className="rower">
          <textarea className="textArea"></textarea>
          <button className="submitButton">plan and start</button>
        </div>
      </div>
    );
  }
}
