import React, { useRef, useMemo, use } from "react";
import { useGLTF } from "@react-three/drei";

import { useTexture } from "@react-three/drei";
import { interopImage } from "../helpers/interopImage";

import TireModel from "../assets/tire/pilot_Sport5_ver2.glb";
import tireBase from "../assets/tire/textures/Sp5_Tire_Game_Mat_BaseColor.png";
import tireNormal from "../assets/tire/textures/Sp5_Tire_Game_Mat_Normal.png";
import tireRoughness from "../assets/tire/textures/Sp5_Tire_Game_Mat_Roughness.png";
import rimBase from "../assets/tire/textures/Sp5_Rim_Game_Mat_BaseColor.png";
import rimNormal from "../assets/tire/textures/Sp5_Rim_Game_Mat_Normal.png";
import rimRoughness from "../assets/tire/textures/Sp5_Rim_Game_Mat_Roughness.png";
import logoBase from "../assets/tire/textures/Logo_Game_Mat_BaseColor.png";
import logoRoughness from "../assets/tire/textures/Logo_Game_Mat_Roughness.png";

import { MeshStandardMaterial } from "three";

export default function SportTire(props) {
  const { nodes, materials } = useGLTF(TireModel);

  const [tireBaseMap, tireNormalMap, tireRoughnessMap] = useTexture([
    interopImage(tireBase),
    interopImage(tireNormal),
    interopImage(tireRoughness),
  ]);

  const [rimBaseMap, rimNormalMap, rimRoughnessMap] = useTexture([
    interopImage(rimBase),
    interopImage(rimNormal),
    interopImage(rimRoughness),
  ]);

  const [logoBaseMap, logoRoughnessMap] = useTexture([
    interopImage(logoBase),
    interopImage(logoRoughness),
  ]);

  tireNormalMap.flipY = tireBaseMap.flipY = false;
  rimNormalMap.flipY = rimBaseMap.flipY = false;
  logoBaseMap.flipY = logoRoughnessMap.flipY = false;

  const mTireBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: tireBaseMap,
        normalMap: tireNormalMap,
        roughness: 0.8,
        roughnessMap: tireRoughnessMap,
        toneMapped: false,
      })
  );

  const mRimBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: rimBaseMap,
        normalMap: rimNormalMap,
        roughness: rimRoughnessMap,
        metalness: 0.2,
        toneMapped: false,
      })
  );

  const mLogo = useMemo(
    () =>
      new MeshStandardMaterial({
        map: logoBaseMap,
        roughness: logoRoughnessMap,
        toneMapped: false,
      })
  );

  return (
    <group scale={0.75} position={[0, 0.1, 0]} rotation={[0, 1.55, 0]}>
      <mesh
        castShadow
        matrixAutoUpdate={false}
        geometry={nodes.Logo_Game_low.geometry}
        material={mLogo}
      />
      <mesh
        castShadow
        matrixAutoUpdate={false}
        geometry={nodes.Rim_Full_Game_low.geometry}
        material={mRimBase}
      />
      <mesh
        castShadow
        matrixAutoUpdate={false}
        geometry={nodes.Tire_Gaming_Low.geometry}
        material={mTireBase}
      />
    </group>
  );
}

useGLTF.preload(TireModel);
useTexture.preload([
  tireBase,
  tireNormal,
  tireRoughness,
  rimBase,
  rimNormal,
  rimRoughness,
  logoBase,
  logoRoughness,
]);
