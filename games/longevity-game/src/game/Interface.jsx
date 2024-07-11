import useGame from "./stores/useGame.jsx";
import useSpeed from "./stores/useSpeed.jsx";
import { useEffect, useRef, useState } from "react";

// Interface komunikacji z grą, wyświetla prędkość, przyciski startu, restartu, hamowania
export default function Interface() {
  const phase = useGame((state) => state.phase);

  const stars = useGame((state) => state.stars);
  const lifes = useGame((state) => state.lifes);

  const isPreloading = useGame((state) => state.isPreloading);

  const restart = useGame((state) => state.restart);
  const start = useGame((state) => state.start);
  const startBraking = useGame((state) => state.startBraking);
  const stopBraking = useGame((state) => state.stopBraking);
  const titleToShow = useGame((state) => state.titleToShow);
  const answerToShow = useGame((state) => state.answerToShow);

  const wcRef = useRef();
  const speedRef = useRef();
  const divider = 3;

  const [speedToShow, setSpeedToShow] = useState(0);

  console.log("render interface", phase);

  return (
    <div>
      {!isPreloading && (
        <div className="interface">
          <div className="time">{stars + " / " + lifes}</div>

          {titleToShow != "" && <div className="qTitle">{titleToShow}</div>}

          {answerToShow != 0 && (
            <div className="answer">
              {answerToShow == 1 ? "correct" : "wrong"}
            </div>
          )}

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
      )}
    </div>
  );
}
