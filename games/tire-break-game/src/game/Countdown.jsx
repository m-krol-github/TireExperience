import useGame from "./stores/useGame.jsx";
import { useEffect, useRef, useState } from "react";

// Interface komunikacji z grą, wyświetla prędkość, przyciski startu, restartu, hamowania
export default function Countdown() {
  const phase = useGame((state) => state.phase);
  const setNoInteraction = useGame((state) => state.setNoInteraction);
  //const [counter, setCounter] = useState(3);
  const [counter, setCounter] = useState(3);
  const counterInterval = useRef(null);

  function startCountdown() {
    console.log("starting countdown ", phase);
    setCounter(3);
    counterInterval.current = setInterval((state) => {
      setCounter((current) => (current -= 1));
      console.log("counting down", counter, phase);
    }, 1000);
  }

  function checkCounter() {
    console.log("checking counter", counter);
    if (counter === 0) {
      console.log("counter is 0");
      clearInterval(counterInterval.current);
      setNoInteraction();
    }
  }

  useEffect(() => {
    checkCounter();
  }, [counter]);

  function reset() {
    console.log("reseting countdown ", phase);
    setCounter(3);
    clearInterval(counterInterval.current);
  }

  useEffect(() => {
    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "readyToBrake") {
          startCountdown();
        } else if (value === "braking") {
          reset();
        }
      }
    );

    return () => {
      unsubsribePhase();
      reset();
    };
  }, []);

  return (
    <div>
      {phase === "readyToBrake" && (
        <div className="countdownTxt">Brake in {counter} seconds</div>
      )}
    </div>
  );
}
