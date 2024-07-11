import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import useTime from "./stores/useTime";
import useGame from "./stores/useGame";
import { useTimer } from "@aakashx2838/use-timer";
import { inverseLerp } from "three/src/math/MathUtils.js";

export default function FlowController() {
  const setGripProgress = useTime((state) => state.setGripProgress);
  const setTimer = useTime((state) => state.setTimer);

  const setReadyToGrip = useGame((state) => state.setReadyToGrip);
  const setLevelCompleted = useGame((state) => state.setLevelCompleted);
  const setLevelFailed = useGame((state) => state.setLevelFailed);
  const setTireChallengeDone = useGame((state) => state.setTireChallengeDone);

  const phase = useGame((state) => state.phase);
  const level = useGame((state) => state.level);

  const moveData = useRef({ speed: 0, distance: 0, gripStartDistance: 0 });

  const { time, toggle, reset } = useTimer({
    reverse: true,
    targetTime: -3,
    loop: true,
  });

  const distances = useMemo(() => {
    return [
      { readyToGrip: 0.14, challengeDone: 0.2, levelCompleted: 0.24 },
      { readyToGrip: 0.3, challengeDone: 0.66, levelCompleted: 0.68 },
      { readyToGrip: 0.73, challengeDone: 0.85, levelCompleted: 0.86 },
    ];
  }, []);

  const gripDistances = useMemo(() => {
    return [
      distances[0].challengeDone - distances[0].readyToGrip,
      distances[1].challengeDone - distances[1].readyToGrip,
      distances[2].challengeDone - distances[2].readyToGrip,
    ];
  });

  function checkDistance() {
    //console.log("PROGRESS : ", moveData.current.distance.toString());
    if (level <= 3) {
      if (
        moveData.current.distance >= distances[level - 1].readyToGrip &&
        phase === "rolling"
      ) {
        reset(true);
        toggle(true);
        setReadyToGrip();
      } else if (
        moveData.current.distance >= distances[level - 1].challengeDone &&
        phase === "grip"
      ) {
        setTireChallengeDone();
      } else if (
        moveData.current.distance >= distances[level - 1].levelCompleted &&
        phase === "challengeDone"
      ) {
        setLevelCompleted();
        console.log(level + "  levelCompleted");
      }
    } else if (level === 4) {
      //setGameCompleted();
      console.log(level + "  Game Completed");
    }
  }

  function checkProgress() {
    const progress = inverseLerp(
      moveData.current.gripStartDistance,
      distances[level - 1].challengeDone,
      moveData.current.distance
    );
    setGripProgress(progress);
    //console.log("PROGRESS : ", progress);
  }

  useEffect(() => {
    const unsubsribeSpeed = useTime.subscribe(
      (state) => state.speed,
      (value) => {
        moveData.current.speed = value;
      }
    );

    const unsubsribeGripStartDistance = useTime.subscribe(
      (state) => state.gripStartDistance,
      (value) => {
        moveData.current.gripStartDistance = value;
      }
    );

    const unsubsribeDistance = useTime.subscribe(
      (state) => state.distance,
      (value) => {
        moveData.current.distance = value;
      }
    );

    return () => {
      unsubsribeSpeed();
      unsubsribeDistance();
      unsubsribeGripStartDistance();
    };
  }, []);

  useFrame((state, delta) => {
    if (phase === "readyToGrip") {
      setTimer(time.s);

      if (time.s === 0) {
        setLevelFailed();
        toggle(false);
      }
    }

    if (phase === "grip") {
      toggle(false);
    }

    if (phase === "restart") {
      console.log("restart");
    }

    checkDistance();

    if (phase === "grip") checkProgress();
  });

  return false;
}
