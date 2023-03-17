import Canvas from "../Canvas";
import React from "react";
import "./SubmitStyles.css";
import Timer from "./Timer";

function PlayMenu() {
  return (
    <div className="center">
      <div className="grid-container">
        <div className="leftrower">
          <div>
            Timer : <Timer />
          </div>
          <div className="block">
            <button>Player1</button>
            <div className="block">
              <button>Player2</button>
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

export default PlayMenu;
