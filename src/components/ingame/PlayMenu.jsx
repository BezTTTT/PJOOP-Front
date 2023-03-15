import Canvas from "../Canvas";
import React from "react";
import "./SubmitStyles.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="grid-container"> 
      
        <div><Canvas /></div>
        <div className="rower">
          <textarea className="textArea"></textarea>
          <button className="submitButton">plan and start</button>
        </div>
       
    </div>
     
    );
  }
}
