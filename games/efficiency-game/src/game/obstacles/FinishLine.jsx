import { useEffect, useRef, useState, useMemo } from "react";
import { Text } from "@react-three/drei";

export function FinishLine(props) {
  console.log("FINISH LINE");

  const lineColor = [1, 1, 1];

  return (
    <group visible={props.activated}>
      <mesh rotation-x={-Math.PI / 2} position={[-5, 0, 0]}>
        <planeGeometry args={[25, 1]} />
        <meshStandardMaterial color={lineColor} />
      </mesh>
    </group>
  );
}
