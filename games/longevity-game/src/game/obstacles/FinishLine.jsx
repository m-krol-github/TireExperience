import { useEffect, useRef, useState, useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function FinishLine(props) {
  console.log("FINISH LINE");

  const lineColor = [0.96, 0.91, 0];

  return (
    <group visible={props.activated}>
      <mesh rotation-x={-Math.PI / 2} position={[-5, 0, 0]}>
        <planeGeometry args={[25, 2]} />
        <meshStandardMaterial
          color={lineColor}
          opacity={0.7}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
