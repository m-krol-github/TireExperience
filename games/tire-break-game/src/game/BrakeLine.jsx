import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import useSpeed from "./stores/useSpeed";
import useGame from "./stores/useGame";
import { gsap } from "gsap";
import * as THREE from "three";

//linia hamowania, w zależności od poziomu, zmienia kolor i czas pojawienia się, do zastąpienia przez coś wtapialnego w asfalcie
export default function BrakeLine(props) {
  const lineLevel = parseInt(props.lineLevel);
  const distance = useRef({});
  const phase = useGame((state) => state.phase);
  const line = useRef();
  const lineColor =
    lineLevel === 2 ? "blue" : lineLevel === 1 ? "yellow" : "white"; //45 i 52 metry hamowania

  const speedDivider = 3; // fix by linia szła dobrze
  const distanceDivider = 3.5; // zblizenie sie do 7 metrow
  const targetX = -5;

  const [activated, setActivated] = useState(false);

  function reset() {
    console.log("reset line");
    distance.target = 0;
    distance.z = 0;
    distance.y = 0.1;
    distance.x = 50;
    setActivated(false);
  }

  useEffect(() => {
    if (phase === "speedingUp") {
      distance.elapsed = 0;
      distance.speed = 0;
      console.log("@@@  speedingUp " + lineLevel);
      //line.current.position.z = -distance.target;
      distance.z = -distance.target;
      line.current.visible = false;
    } else if (phase === "braking") {
      line.current.visible = true;
    } else if (phase === "levelFailed") {
      line.current.visible = false;
      reset();
    }
  }, [phase]);

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
        distance.target = value / distanceDivider;
        gsap.to(line.current.position, {
          duration: 0.5,
          x: targetX,
          yoyo: false,
          repeat: 0,
          ease: "bounce.out",
          onComplete: () => {
            console.log("!!! Line is activated ");
            distance.x = targetX;
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
    if (phase === "braking" && activated) {
      //zacznij przesuwać jak jesteś w fazie hamowania i linia jest aktywowana
      let newZ =
        line.current.position.z + (distance.speed * delta) / speedDivider;
      line.current.position.z = newZ;
    }
  });

  return (
    <mesh
      ref={line}
      position={[distance.x, distance.y, distance.z]}
      rotation-x={-Math.PI / 2}
    >
      <planeGeometry args={[28, 1]} />
      <meshStandardMaterial
        color={lineColor}
        opacity={0.7}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
