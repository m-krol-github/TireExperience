import useGame from "./stores/useGame.jsx";
import useSpeed from "./stores/useSpeed.jsx";
import { useEffect, useRef, useState } from "react";

// Interface komunikacji z grą, wyświetla prędkość, przyciski startu, restartu, hamowania
export default function Interface() {
  const phase = useGame((state) => state.phase);

  const stars = useGame((state) => state.stars);
  const lifes = useGame((state) => state.lifes);

  const restart = useGame((state) => state.restart);
  const start = useGame((state) => state.start);
  const startBraking = useGame((state) => state.startBraking);
  const stopBraking = useGame((state) => state.stopBraking);

  const wcRef = useRef();
  const speedRef = useRef();
  const divider = 3;

  const [speedToShow, setSpeedToShow] = useState(0);

  console.log("render interface", phase);

  return (
    <div className="interface">
      <div className="time">{stars + " / " + lifes}</div>

      {/*phase === "ready" && (
        <div className="btn" onClick={start}>
          Start game
        </div>
      )*/}

      {(phase === "gameCompleted" || phase === "gameFailed") && (
        <div className="btn" onClick={restart}>
          Try again
        </div>
      )}
      {phase === "readyToStart" && (
        <div className="btn" onClick={start}>
          Start Game FirstTime
        </div>
      )}
      {phase === "gameCompleted" && (
        <div className="infoTxt">Game Completed with {stars} stars</div>
      )}
      {phase === "gameFailed" && (
        <div className="infoTxt">Game Failed with {stars} stars </div>
      )}
    </div>
  );
}
