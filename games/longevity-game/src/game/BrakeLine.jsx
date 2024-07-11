import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import useSpeed from "./stores/useSpeed";
import useGame from "./stores/useGame";
import { gsap } from "gsap";

//linia hamowania, w zależności od poziomu, zmienia kolor i czas pojawienia się, do zastąpienia przez coś wtapialnego w asfalcie
export default function BrakeLine(props) {
  const lineLevel = parseInt(props.lineLevel);
  const distance = useRef({});
  const phase = useGame((state) => state.phase);
  const line = useRef();
  const lineColor =
    lineLevel === 2 ? "blue" : lineLevel === 1 ? "yellow" : "white";
  const level = useGame((state) => state.level);

  const [activated, setActivated] = useState(false);

  function reset() {
    distance.target = 0;
    distance.z = 0;
    distance.y = 0.1;
    distance.x = 50;
    setActivated(false);
  }

  useEffect(() => {
    if (phase == "speedingUp") {
      distance.elapsed = 0;
      distance.speed = 0;
      console.log("@@@  speedingUp " + lineLevel);
      //line.current.position.z = -distance.target;
      distance.z = -distance.target;
      line.current.visible = false;
    } else if (phase == "braking") {
      line.current.visible = true;
    } else if (phase == "levelFailed") {
      line.current.visible = false;
      reset();
    }
  }, [phase]);

  /*  useEffect(() =>
  {
    if(lineLevel <= level)
    {
      line.current.visible = true;
    }else
    {
      line.current.visible = false;
    }

  }, [level]);*/

  useLayoutEffect(() => {
    distance.elapsed = 0;
    distance.speed = 0;
    reset();

    const unsubsribeDist = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        distance.speed = value;
      }
    );

    return () => {
      unsubsribeDist();
    };
  }, []);

  useEffect(() => {
    line.current.position.x = 9;

    const unsubsribeTargetDistance = useSpeed.subscribe(
      (state) => state.targetDistance[lineLevel],
      (value) => {
        console.log("!!! distance in line", value, lineLevel);
        distance.target = value;
        gsap.to(line.current.position, {
          duration: 0.5,
          x: 0,
          yoyo: false,
          repeat: 0,
          ease: "bounce.out",
          onComplete: () => {
            console.log("!!! Line is activated ");
            distance.x = 0.1;
            setActivated(true);
          },
        });
      }
    );

    return () => {
      unsubsribeTargetDistance();
    };
  }, []);

  useFrame((state, delta) => {
    if (phase == "braking" && activated) {
      //zacznij przesuwać jak jesteś w fazie hamowania i linia jest aktywowana
      let newZ = line.current.position.z + distance.speed * delta;
      line.current.position.z = newZ;
    }
  });

  return (
    <mesh
      ref={line}
      position={[distance.x, distance.y, distance.z]}
      rotation-x={-Math.PI / 2}
    >
      <planeGeometry args={[30, 1]} />
      <meshStandardMaterial color={lineColor} />
    </mesh>
  );
}
