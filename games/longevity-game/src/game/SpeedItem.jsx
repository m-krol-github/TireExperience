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
    ref.current.rotation.y = props.rotation;
  }

  useFrame((_state, delta) => {
    ref.current.position.z += delta * currentSpeed.current * props.speedFactor;

    if (ref.current.position.z >= props.offsetZ.min) {
      ref.current.position.z = props.offsetZ.max;
      if (props.initialPosition != undefined) {
        let pos = props.initialPosition(props.index);
        //console.log("initialPosition", pos);
        ref.current.position.x = pos.x;
        if (ref.current.position.x < 0) ref.current.rotation.y = props.rotation;
        else ref.current.rotation.y = -props.rotation;
      }
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
    if (props.startPosition.x < 0) ref.current.rotation.y = props.rotation;
    else ref.current.rotation.y = -props.rotation;

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

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.children.forEach((child) => {
  //       if (child.material) {
  //         child.material.transparent = true;
  //         child.material.opacity = 0.5; // set the opacity as needed
  //       }
  //     });
  //   }
  // }, [ref.current]);

  return <group ref={ref}>{props.children}</group>;
}
