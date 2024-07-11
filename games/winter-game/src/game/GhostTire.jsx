import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import ghostTire from "../assets/tire/ghostTire.glb";
import tireBase from "../assets/tire/GhostTire/Tire_Game_Mat_BaseColor.png";
import tireNormal from "../assets/tire/GhostTire/Rim_Game_Mat_Normal.png";

import rimBase from "../assets/tire/GhostTire/Tire_Game_Mat_BaseColor.png";
import rimNormal from "../assets/tire/GhostTire/Tire_Game_Mat_Normal.png";

import { interopImage } from "../helpers/interopImage";

import { MeshStandardMaterial } from "three";

export function GhostTire(props) {
  const { nodes } = useGLTF(ghostTire);

  const [tireBaseMap, tireNormalMap] = useTexture([interopImage(tireBase)]);

  const [rimBaseMap, rimNormalMap] = useTexture([interopImage(rimBase)]);

  const mTireBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: tireBaseMap,
        normalMap: tireNormalMap,
        toneMapped: true,
        opacity: 0.7,
        transparent: true,
        flatShading: true,
        roughness: 0.5,
        metalness: 0.1,
      })
  );

  const mRimBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: tireBaseMap,
        normalMap: tireNormalMap,
        toneMapped: true,
        opacity: 0.7,
        transparent: true,
        flatShading: true,
        roughness: 0.5,
        metalness: 0.1,
      })
  );

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={0.1}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Defender2_Tire_Game_low.geometry}
          material={mTireBase}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Defender_2_Rim_Game_low.geometry}
          material={mRimBase}
        />
      </group>
    </group>
  );
}

useGLTF.preload(ghostTire);
useTexture.preload([tireBase, tireNormal, rimBase, rimNormal]);
