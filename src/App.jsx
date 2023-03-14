import React from "react";
import Canvas from "./components/Canvas";
import { useState } from "react";
import StartMenu from "./components/startmenu/StartMenu";
import PlayMenu from "./components/ingame/PlayMenu";
export const App = () => {
  const [mode, setMode] = useState("start");
  {
    return (
      <div>
        {mode === "start" && (
          <StartMenu onStartClick={() => setMode("Playing")} />
        )}

        {mode === "Playing" && <PlayMenu />}

        {mode === "gameOver" && <>Game Over</>}
      </div>
    );
  }
};

export default App;
