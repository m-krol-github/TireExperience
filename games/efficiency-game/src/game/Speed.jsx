import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useSpeed from "./stores/useSpeed";
import useGame from "./stores/useGame";
import gsap from "gsap";

// klassa do obsługi prędkości i hamowania, w zależności od fazy gry, prędkość rośnie lub maleje, dzięki GSAP
export default function Speed() {
  const speed = useSpeed((state) => state.speed);
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
  const brakingTime = 2;

  const moveData = useRef({});

  useFrame((state, delta) => {
    setDistance((speed * delta) / 100);
  });

  useEffect(() => {
    resetDistance();
    moveData.current = { speed: 0, distance: 0, time: 0 };

    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        //console.log("!!! phase in speed", value);

        if (value === "play") {
          resetDistance();
          console.log("!!! speedingUp in speed and play");
          gsap.to(moveData.current, {
            duration: 3,
            speed: 120,
            yoyo: false,
            repeat: 0,
            ease: "power1.inOut",
            onComplete: () => {
              console.log("current speed set completed score");
            },
            onUpdate: () => {
              //console.log("speed", moveData.current.speed);
              setSpeed(moveData.current.speed);
            },
          });
        } else if (value === "gameCompleted" || value === "gameFailed") {
          gsap.to(moveData.current, {
            duration: brakingTime,
            speed: 0,
            yoyo: false,
            repeat: 0,
            ease: "power1.out",
            onComplete: () => {
              console.log("brake test Completed");
              //    setCompleted();
            },
            onUpdate: () => {
              setSpeed(moveData.current.speed);
            },
          });
        }
      }
    );

    return () => {
      unsubsribePhase();
      console.log("unsubsribePhase speed in speed");
    };
  }, [brakingTime]);

  return false;
}
