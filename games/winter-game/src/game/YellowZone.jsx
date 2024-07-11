import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { interopImage } from "../helpers/interopImage";
import { Vector2, AdditiveBlending } from "three";

import zone from "../assets/terrain/yellowZone.glb";

import yellowArrow from "../assets/terrain/yellowArrow.png";

export function YellowZone(props) {
  const { nodes, materials } = useGLTF(zone);

  const arrow = useTexture(interopImage(yellowArrow));

  arrow.repeat = new Vector2(1, 0.3);
  arrow.offset = new Vector2(0, 18 - props.offset * 36);
  arrow.anisotropy = 16;

  //   arrow.flipY = false;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.strada.geometry}>
        <meshBasicMaterial
          map={arrow}
          transparent
          opacity={0.6}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(zone);
useTexture.preload(yellowArrow);
