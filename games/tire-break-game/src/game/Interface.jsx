import useGame from "./stores/useGame.jsx";
import useSpeed from "./stores/useSpeed.jsx";
import { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import Countdown from "./Countdown.jsx";
// Interface komunikacji z grą, wyświetla prędkość, przyciski startu, restartu, hamowania
export default function Interface() {
  const phase = useGame((state) => state.phase);
  const level = useGame((state) => state.level);
  const isPreloading = useGame((state) => state.isPreloading);

  const restart = useGame((state) => state.restart);
  const showLevelIntro = useGame((state) => state.showLevelIntro);
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const startBraking = useGame((state) => state.startBraking);
  const stopBraking = useGame((state) => state.stopBraking);

  const speedRef = useRef();
  const divider = 3;

  const [speedToShow, setSpeedToShow] = useState(0);

  const [subscribeKeys] = useKeyboardControls();

  // console.log("interface phase", phase);

  useEffect(() => {
    const unsubscribeBrake = subscribeKeys(
      (state) => state.brake,
      (value) => {
        // console.log("!!! brake in interface", value, phase);
        if (phase === "readyToBrake" || phase === "braking") {
          if (value) {
            //   console.log("!!! brake started");
            startBraking();
          } else {
            //  console.log("!!! brake stopped");
            stopBraking();
          }
        }
      }
    );

    return () => {
      unsubscribeBrake();
    };
  }, [phase]);

  useEffect(() => {
    //    restart();
    const unsubsribeSpeed = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        //console.log("!!! speed in interface", value, Math.round(value));
        speedRef.current = value;

        if (Math.round(value) !== speedToShow) {
          setSpeedToShow(Math.round(value / divider));
        }
      }
    );

    return () => {
      unsubsribeSpeed();
    };
  }, []);

  //console.log("render interface", phase);

  return (
    <div>
      {!isPreloading !== "preloading" && (
        <div className="interface">
          <div className="time">{speedToShow + " mph"}</div>

          {phase === "ready" && (
            <div className="btn" onClick={start}>
              Start test {level}
            </div>
          )}

          {phase === "levelCompleted" && level <= 2 && (
            <div className="btn" onClick={showLevelIntro}>
              Go to next test {level}
            </div>
          )}

          {phase === "levelFailed" && (
            <div className="btn" onClick={restart}>
              Try again
            </div>
          )}

          {phase === "init" && (
            <div className="btn" onClick={restart}>
              Init
            </div>
          )}

          {phase === "readyToBrake" && (
            <div className="infoTxt">Brake NOW !</div>
          )}
          {phase === "nobraking" && (
            <div className="infoTxt">
              Keep braking <br></br>next time !
            </div>
          )}
          {phase === "nointeraction" && (
            <div className="infoTxt">
              Start braking <br></br>next time !
            </div>
          )}

          {phase === "ready" && level === 1 && (
            <div className="infoTxt">Tire new, road wet</div>
          )}

          {phase === "ready" && level === 2 && (
            <div className="infoTxt">Tire worn, road wet</div>
          )}

          {phase === "ended" && <div className="infoTxt">Game over</div>}

          {phase === "levelCompleted" && level === 2 && (
            <div className="infoTxt">Level completed, time 3.3 </div>
          )}
          {phase === "levelCompleted" && level === 3 && (
            <div>
              <div className="infoTxt">Level completed, time 3.8 </div>
              <div className="btn" onClick={end}>
                End game
              </div>
            </div>
          )}

          {phase === "ready" && (
            <div className="btn" onClick={start}>
              Start test {level}
            </div>
          )}

          {(phase === "readyToBrake" || phase === "braking") && (
            <div
              className="btn"
              onMouseDown={startBraking}
              onTouchStart={startBraking}
              onMouseUp={stopBraking}
              onTouchEnd={stopBraking}
            >
              Brake
            </div>
          )}
          <Countdown />
        </div>
      )}
    </div>
  );
}
