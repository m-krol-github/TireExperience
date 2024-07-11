import useGame from "./stores/useGame.jsx";
import useTime from "./stores/useTime.jsx";
import { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";

// Interface komunikacji z grą, wyświetla prędkość, przyciski startu, restartu, hamowania
export default function Interface() {
  const phase = useGame((state) => state.phase);
  const level = useGame((state) => state.level);
  const roll = useGame((state) => state.roll);
  const startGripToStore = useGame((state) => state.startGrip);
  const stopGrip = useGame((state) => state.stopGrip);
  const restart = useGame((state) => state.restart);
  const reset = useTime((state) => state.reset);
  const setGripStartDistance = useTime((state) => state.setGripStartDistance);

  const timerRef = useRef();

  const [showTimer, setShowTimer] = useState(3);

  const gripProgress = useTime((state) => state.gripProgress);

  const [subscribeKeys] = useKeyboardControls();

  console.log("interface phase", phase);

  function startGrip() {
    startGripToStore();
    setGripStartDistance(); //todo : dodać to przy klawiaturze
  }

  function restartAll() {
    restart();
    reset();
  }

  // console.log("interface phase", phase);

  useEffect(() => {
    const unsubscribeGrip = subscribeKeys(
      (state) => state.grip,
      (value) => {
        // console.log("!!! brake in interface", value, phase);
        if (phase === "readyToGrip" || phase === "grip") {
          if (value) {
            //  console.log("!!! grip started");
            startGrip();
          } else {
            //  console.log("!!! grip stopped");
            stopGrip();
          }
        }
      }
    );

    return () => {
      unsubscribeGrip();
    };
  }, [phase, startGrip, stopGrip, subscribeKeys]);

  return (
    <div className="interface">
      {phase === "grip" && (
        <div className="gripProgress">{gripProgress} " %"</div>
      )}

      {phase === "levelCompleted" && level <= 3 && (
        <div className="btn" onClick={roll}>
          Start ride {level}
        </div>
      )}
      {phase === "levelFailed" && (
        <div className="btn" onClick={restartAll}>
          Try again
        </div>
      )}
      {phase === "ended" && (
        <div className="btn" onClick={roll}>
          Start Game
        </div>
      )}
      {phase === "gripStopped" && (
        <div className="infoTxt">
          Keep holding <br></br>next time !!!
        </div>
      )}
      {phase === "readyToGrip" && (
        <div className="infoTxt">{"PRESS an HOLD in: " + showTimer}</div>
      )}

      {phase === "grip" && <div className="infoTxt"> Keep for Grip !!! </div>}
      {phase === "levelCompleted" && level === 1 && (
        <div className="infoTxt"> Level Reached </div>
      )}
      {phase === "gameWin" && level === 4 && (
        <div className="infoTxt">
          {" "}
          Game Finished <br></br> Congratulations{" "}
        </div>
      )}
      {phase === "gameWin" && (
        <div className="btn" onClick={roll}>
          Pick your next challenge...
        </div>
      )}
      {(phase === "readyToGrip" || phase === "grip") && (
        <div
          className="btn"
          onMouseDown={startGrip}
          onTouchStart={startGrip}
          onMouseUp={stopGrip}
          onTouchEnd={stopGrip}
        >
          Control the Tire
        </div>
      )}
    </div>
  );
}
