import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import useSpeed from "./stores/useSpeed";
import useGame from "./stores/useGame";
import gsap from "gsap";

// klassa do obsługi prędkości i hamowania, w zależności od fazy gry, prędkość rośnie lub maleje, dzięki GSAP
export default function Speed() {
  const setSpeed = useSpeed((state) => state.setSpeed);
  const setDistance = useSpeed((state) => state.setDistance);
  const resetDistance = useSpeed((state) => state.resetDistance);
  const confirmTargetDistance = useSpeed(
    (state) => state.confirmTargetDistance
  );

  const setReadyToBrake = useGame((state) => state.setReadyToBrake);
  const setCompleted = useGame((state) => state.setLevelCompleted); //todo dodać
  const setLevelFailed = useGame((state) => state.setLevelFailed); //todo dodać

  const phase = useGame((state) => state.phase);
  const level = useGame((state) => state.level);
  const brakingTime = useMemo(() => {
    let t = 3;
    if (level === 1) t = 3.3;
    else if (level === 2) t = 3.8;
    else t = 5;

    console.log("braking timelevel", level, t);
    return t;
  }, [level]);

  const moveData = useRef({});

  useEffect(() => {
    resetDistance();
    moveData.current = { speed: 0, distance: 0, time: 0 };

    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        console.log("!!! phase changed in speed", value);
        if (value === "ready") {
          //[0,-4, -7]}
          // gsap.to(ggg.current.position, { duration: 2,  x: startPostion.x, y: startPostion.y, z: startPostion.z, yoyo: false, repeat: 0, ease: 'bounce', onComplete: () => console.log("the tween is complete") })
        } else if (value === "speedingUp") {
          console.log("!!! speedingUp in speed");
          gsap.to(moveData.current, {
            duration: 3,
            speed: 180,
            yoyo: false,
            repeat: 0,
            ease: "power1.inOut",
            onComplete: () => {
              console.log("current speed completed");
              setReadyToBrake();
            },
            onUpdate: () => {
              //console.log("speed", moveData.current.speed);
              setSpeed(moveData.current.speed);
            },
          });
        } else if (value === "braking") {
          console.log("!!! braking in speed " + brakingTime);
          gsap.to(moveData.current, {
            duration: brakingTime,
            speed: 0,
            yoyo: false,
            repeat: 0,
            ease: "power1.out",
            onComplete: () => {
              console.log("brake test Completed");
              confirmTargetDistance(level);
              setCompleted();
            },
            onUpdate: () => {
              //console.log("speed", moveData.current.speed);

              setSpeed(moveData.current.speed);
            },
          });
        } else if (value === "nobraking") {
          console.log("!!! no braking in speed");
          gsap.killTweensOf(moveData.current);
          setTimeout(() => {
            resetDistance();
            setLevelFailed();
          }, 2000);
        } else if (value === "nointeraction") {
          console.log("!!! no interaction in speed");
          gsap.killTweensOf(moveData.current);
          setTimeout(() => {
            resetDistance();
            setLevelFailed();
          }, 2000);
        } else if (value === "ended") {
          console.log("!!! ended");
        }
      }
    );

    return () => {
      unsubsribePhase();
      console.log("unsubsribePhase speed in speed");
    };
  }, [brakingTime]);

  useFrame((state, delta) => {
    if (phase === "braking") setDistance(moveData.current.speed * delta);
  });

  return false;
}
