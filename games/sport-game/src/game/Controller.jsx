import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

import useControll from "./stores/useControll";
import { useKeyboardControls } from "@react-three/drei";

export default function Controller() {
  const leftTurn = useRef(false);
  const rightTurn = useRef(false);
  const [subscribeKeys] = useKeyboardControls();

  const setTurn = useControll((state) => state.setTurn);
  const turn = useControll((state) => state.turn);

  useEffect(() => {
    const unsubscribeLeft = subscribeKeys(
      (state) => state.leftward,
      (value) => {
        leftTurn.current = value;
      }
    );

    const unsubscribeRight = subscribeKeys(
      (state) => state.rightward,
      (value) => {
        rightTurn.current = value;
      }
    );
    return () => {
      unsubscribeLeft();
      unsubscribeRight();
    };
  }, []);

  useFrame((state, delta) => {
    if (leftTurn.current) {
      setTurn(-1);
    } else if (rightTurn.current) {
      setTurn(1);
    } else if (turn > 0) {
      setTurn(-1);
    } else if (turn < 0) {
      setTurn(1);
    }

    /*  if (leftTurn.current) {
      setTurn(-1);
    }else if (rightTurn.current) {
      setTurn(1);
    }*/
  });

  return false;
}
