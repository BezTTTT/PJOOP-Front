import Canvas from "../Canvas";
import React from "react";
import "./SubmitStyles.css";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="centered">
          <Canvas />
        </div>
        <div>
          <textarea className="textArea"></textarea>
          <button className="submitButton">plan and start</button>
        </div>
      </div>
    );
  }
}
