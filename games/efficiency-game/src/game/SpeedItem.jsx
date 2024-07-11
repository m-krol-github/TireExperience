import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useSpeed from "./stores/useSpeed";
import useGame from "./stores/useGame";
import gsap from "gsap";

// klassa do obsługi poruszających się obiektów
export default function SpeedItem(props) {
  const ref = useRef();
  const currentSpeed = useRef(0);

  function setInitialPosition() {
    ref.current.position.x = props.startPosition.x;
    ref.current.position.y = props.startPosition.y;
    ref.current.position.z = props.startPosition.z;
    console.log("setInitialPosition", ref.current.position);
  }

  useFrame((_state, delta) => {
    ref.current.position.z += delta * currentSpeed.current * props.speedFactor;

    if (ref.current.position.z >= props.offsetZ.min) {
      ref.current.position.z = props.offsetZ.max;
    }
  });

  useEffect(() => {
    setInitialPosition();

    const unsubsribeSpeed = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        currentSpeed.current = value;
      }
    );
    return () => {
      unsubsribeSpeed();
    };
  }, []);

  return (
    <group ref={ref} position={props.position}>
      {props.children}
    </group>
  );
}
