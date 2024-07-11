import React, { useRef, useState, useEffect, useMemo } from "react";
import { Vector3, RepeatWrapping, SRGBColorSpace } from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { interopImage } from "../helpers/interopImage";

import lampGLTF from "../assets/objects/Street_Lamp.glb";

import lampBase from "../assets/textures/Street_light/Street_Light_Mat_BaseColor_sRGB.png";
import lampMetalic from "../assets/textures/Street_light/Street_Light_Mat_Metallic_Raw.png";
import lampRoughness from "../assets/textures/Street_light/Street_Light_Mat_Roughness_Raw.png";

import SpeedItem from "./SpeedItem";

function Lamp({ index }) {
  const { nodes, materials } = useGLTF(lampGLTF);

  const [base1, metalness1, roughness1] = useTexture([
    interopImage(lampBase),
    interopImage(lampMetalic),
    interopImage(lampRoughness),
  ]);

  base1.flipY = false;
  metalness1.flipY = false;
  roughness1.flipY = false;

  const lamp = useRef();

  return (
    <mesh
      ref={lamp}
      castShadow
      receiveShadow
      geometry={nodes.Street_Lamp.geometry}
      // material={materials.Street_Light_Mat}
      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      scale={0.15}
    >
      <meshStandardMaterial
        map={base1}
        metalnessMap={metalness1}
        metalness={1}
        roughnessMap={roughness1}
        toneMapped={false}
        transparent={true}
      />
    </mesh>
  );
}

export function Lamps() {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 10; i++) a.push(0);
    return a;
  });

  function getStartPosition(index) {
    return new Vector3(-25, 0, index * 26 - 220);
  }

  return (
    <>
      {arr.map((e, i) => (
        <SpeedItem
          key={i}
          index={i}
          startPosition={getStartPosition(i)}
          offsetZ={{ min: 40, max: -220 }}
          speedFactor={0.3}
        >
          <Lamp key={i} index={i} />
        </SpeedItem>
      ))}
    </>
  );
}

useGLTF.preload(lampGLTF);
useTexture.preload([lampBase, lampMetalic, lampRoughness]);
