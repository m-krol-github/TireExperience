import React, { useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import YellowZone from "../assets/terrain/yellowZones.glb";
import YellowImage from "../assets/terrain/Yellow.png";
import { interopImage } from "../helpers/interopImage";
import { MeshStandardMaterial } from "three";

export function YellowZones(props) {
  const { nodes } = useGLTF(YellowZone);

  const [yellowBaseMap] = useTexture([interopImage(YellowImage)]);

  const mYellowBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: yellowBaseMap,
        toneMapped: true,
        opacity: 0.4,
        transparent: true,
        flatShading: true,
        roughness: 0.1,
        metalness: 0.1,
      })
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.strada003.geometry}
        position={[0, 0, 0]}
        material={mYellowBase}
      />
    </group>
  );
}

useGLTF.preload(YellowZone);
useTexture.preload(YellowImage);
