import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import useSpeed from "./stores/useTime";
import useGame from "./stores/useGame";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

export default function Speed() {
  const setSpeed = useSpeed((state) => state.setSpeed);
  const setDistance = useSpeed((state) => state.setDistance);
  const setGameOver = useGame((state) => state.setGameOver);

  const level = useRef(1);

  const moveData = useRef({});

  useEffect(() => {
    moveData.current = { speed: 0, distance: 0, time: 0 };

    const unsubsribeLevel = useGame.subscribe(
      (state) => state.level,
      (value) => {
        level.current = value;
      }
    );

    return () => {
      unsubsribeLevel();
    };
  }, []);

  const levelSpeedData = useMemo(() => {
    return [
      {
        rolling: { duration: 3, speed: 5, acc: -1.85, ease: "circ.out" }, //ease: CustomEase.create("custom", "M0,0 C0,0 0.1405,0.03363 0.185,0.04842 0.22428,0.06147 0.29873,0.09128 0.335,0.10929 0.37144,0.12739 0.4418,0.16891 0.475,0.19252 0.50828,0.21619 0.57051,0.26862 0.6,0.29782 0.63225,0.32975 0.69247,0.40053 0.72,0.43744 0.74761,0.47444 0.79673,0.55185 0.82,0.59278 0.8459,0.63833 0.89312,0.73435 0.915,0.7836 0.93835,0.83617 1,1 1,1 ")},
        readyToGrip: {duration: 0.5,speed: 0.001,acc: -2.55,ease: "power1.out",},
        grip: { duration: 0.5, speed: 0.02, acc: -2.5, ease: "power1.out" },
        challengeDone: { duration: 1, speed: 0.06, acc: -1.5, ease: "sine.in" },
        levelCompleted: { duration: 0.1, speed: 0.02, acc: -1.5, ease: "sine.out" },
      },
    ];
  });

  useEffect(() => {
    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        console.log("!!! phase changed in speed", value);

        let speedData = levelSpeedData[level.current - 1][value];

        if (
          value === "rolling" ||
          value === "challengeDone" ||
          value === "levelCompleted" ||
          value === "grip" ||
          value === "readyToGrip"
        ) {
          gsap.to(moveData.current, {
            duration: speedData.duration,
            speed: speedData.speed,
            acc: speedData.acc,
            ease: speedData.ease,

            onComplete: () => {
              //setReadyToGrip();
            },
            onUpdate: () => {
              //console.log("speed", moveData.current.speed);
              setSpeed(moveData.current.speed);
            },
          });
        } else if (value === "gripStopped") {
          console.log("!!! gripStopped in speed");
          gsap.to(moveData.current, {
            duration: 4,
            speed: 0,
            ease: "expo.in",
            onComplete: () => {
              //setReadyToGrip();
            },
            onUpdate: () => {
              //console.log("speed", moveData.current.speed);
              setSpeed(moveData.current.speed);
            },
          });
        } else if (value === "levelFailed") {
          console.log("!!! levelFailed in speed");
          gsap.to(moveData.current, {
            duration: 0,
            speed: 0,
            ease: "expo.in",
            onComplete: () => {
              //setReadyToGrip();
            },
            onUpdate: () => {
              //console.log("speed", moveData.current.speed);
            },
          });
        } else if (value === "gameWin") {
          console.log("!!! gameWin in speed");
          gsap.to(moveData.current, {
            duration: 3,
            speed: 0,
            ease: "expo.out",
            onComplete: () => {
              //setReadyToGrip();
            },
            onUpdate: () => {
              //console.log("speed", moveData.current.speed);
            },
          });
        } else if (value === "ready") {
          console.log("!!! no grip in speed");
          gsap.killTweensOf(moveData.current);
          setTimeout(() => {
            setGameOver();
          }, 200);
        }
      }
    );
    return () => {
      unsubsribePhase();
      console.log("unsubsribePhase speed in speed");
    };
  }, []);

  useFrame((state, delta) => {
    //console.log("speed level", level.current);

    //setDistance("delta");
  });

  return false;
}
