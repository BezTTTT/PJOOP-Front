import Canvas from "../Canvas";
import React from "react";
import "./SubmitStyles.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="center">
        <div className="grid-container">
          <div className="leftrower">
            <div>TIMER</div>
            <div className="block">
              <label>Player1</label>
              <div className="block">
                <label>Player2</label>
              </div>
            </div>
            <div className="block">
              <label>Budget</label>
            </div>
          </div>

          <div>
            <h1>Round xx</h1>
            <Canvas />
          </div>
          <div className="rower">
            <textarea className="textArea"></textarea>
            <button className="submitButton">plan and start</button>
          </div>
        </div>
      </div>
    );
  }
}
