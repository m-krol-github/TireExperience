import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import winterTire from "../assets/tire/winterTire.glb";
import tireBase from "../assets/tire/Texture/XIceSnow_Tire_Game_BaseColor.png";
import tireNormal from "../assets/tire/Texture/XIceSnow_Tire_Game_Normal.png";
import tireRoughness from "../assets/tire/Texture/XIceSnow_Tire_Game_Roughness.png";

import logoBase from "../assets/tire/Texture/Logo_Game_Mat_BaseColor.png";
import logoRoughness from "../assets/tire/Texture/Logo_Game_Mat_Roughness.png";

import rimBase from "../assets/tire/Texture/XIceSnow_Rim_Game_BaseColor.png";
import rimNormal from "../assets/tire/Texture/XIceSnow_Rim_Game_Normal.png";
import rimRoughness from "../assets/tire/Texture/XIceSnow_Rim_Game_Roughness.png";

import { interopImage } from "../helpers/interopImage";
import { MeshStandardMaterial } from "three";

export function WinterTire(props) {
  const { nodes } = useGLTF(winterTire);

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

  const mTireBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: tireBaseMap,
        normalMap: tireNormalMap,
        roughness: tireRoughnessMap,
        toneMapped: false,
      })
  );

  const mRimBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: rimBaseMap,
        normalMap: rimNormalMap,
        roughness: rimRoughnessMap,
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
    <group {...props} dispose={null} castShadow receiveShadow>
      <group rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.08}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Logo_Game_low.geometry}
          material={mLogo}
          position={[0.012, 0.357, 0.003]}
          rotation={[0, 0, Math.PI]}
          scale={1.268}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.XIceSnoew_Rim_Game_low.geometry}
          material={mRimBase}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.XIceSnoew_Tire_Game_low.geometry}
          material={mTireBase}
          rotation={[0, 0, Math.PI]}
          scale={1.151}
        />
      </group>
    </group>
  );
}

useGLTF.preload(winterTire);
useTexture.preload([tireBase, tireNormal, tireRoughness]);
useTexture.preload([rimBase, rimNormal, rimRoughness]);
useTexture.preload([logoBase, logoRoughness]);
