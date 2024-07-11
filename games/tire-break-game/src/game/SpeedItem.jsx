import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import useSpeed from "./stores/useSpeed";

// klassa do obsługi poruszających się obiektów
export default function SpeedItem(props) {
  const ref = useRef();
  const currentSpeed = useRef(0);

  function setInitialPosition() {
    ref.current.position.x = props.startPosition.x;
    ref.current.position.y = props.startPosition.y;
    ref.current.position.z = props.startPosition.z;
  }

  useFrame((_state, delta) => {
    ref.current.position.z += delta * currentSpeed.current * props.speedFactor;

    if (ref.current.position.z >= props.offsetZ.min) {
      ref.current.position.z = props.offsetZ.max;
      // if (props.initialPosition !== undefined) {
      //   let pos = props.initialPosition(props.index);
      //   ref.current.position.x = pos.x;
      // }
    }

    if (ref.current.position.z < props.offsetZ.max + 20) {
      ref.current.children.forEach((child) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity =
            (ref.current.position.z - props.offsetZ.max) / 20; // set the opacity as needed
        }
      });
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
