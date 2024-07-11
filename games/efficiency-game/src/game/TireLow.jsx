import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { interopImage } from "../helpers/interopImage";
import useGame from "./stores/useGame";

import crossclimateLow from "../assets/Crossclimate/Crossclimate_Game_Embedded_V01.glb";

import newBase from "../assets/Crossclimate/New/Tire_Game_Mat_BaseColor.png";
import newNormal from "../assets/Crossclimate/New/Tire_Game_Mat_Normal.png";
import newRoughness from "../assets/Crossclimate/New/Tire_Game_Mat_Roughness.png";

import wornBase from "../assets/Crossclimate/Worn/Tire_Game_WORN_BaseColor.png";
import wornNormal from "../assets/Crossclimate/Worn/Tire_Game_WORN_Normal.png";
import wornRoughness from "../assets/Crossclimate/Worn/Tire_Game_WORN_Roughness.png";

export default function TireLow(props) {
  const { nodes, materials } = useGLTF(crossclimateLow);
  const level = useGame((state) => state.level);
  const phase = useGame((state) => state.phase);

  const [base1, normal1, roughness1] = useTexture([
    interopImage(newBase),
    interopImage(newNormal),
    interopImage(newRoughness),
  ]);

  base1.flipY = false;
  normal1.flipY = false;
  roughness1.flipY = false;

  const [base2, normal2, roughness2] = useTexture([
    interopImage(wornBase),
    interopImage(wornNormal),
    interopImage(wornRoughness),
  ]);

  base2.flipY = false;
  normal2.flipY = false;
  roughness2.flipY = false;

  materials.Tire_Game_Mat.toneMapped = false;
  materials.Logo_Game_Mat.toneMapped = false;
  materials.Rim_Game_Mat.toneMapped = false;
  materials.Rim_Game_Mat.metalness = 0.4;

  useEffect(() => {
    alignBlocksTextureWithLevel();
  }, [phase]);

  useEffect(() => {
    alignBlocksTextureWithLevel();
  }, []);

  function alignBlocksTextureWithLevel() {
    if (phase === "ready" || phase === "init") {
      if (level === 1) {
        materials.Tire_Game_Mat.map = base1;
        materials.Tire_Game_Mat.color = { r: 0.7, g: 0.7, b: 0.7 };
      } else {
        materials.Tire_Game_Mat.map = base2;
        materials.Tire_Game_Mat.color = { r: 0.9, g: 0.9, b: 0.9 };
      }

      materials.Tire_Game_Mat.needsUpdate = true;
    }
  }

  /*const [useNew, setUseNew] = useState(true);

  useEffect(() => {
    materials.Tire_Game_Mat.map = base1;
    materials.Tire_Game_Mat.color = { r: 0.7, g: 0.7, b: 0.7 };
  }, []);

  function toggleTireTexture() {
    setUseNew((s) => !s);
    if (useNew) {
      materials.Tire_Game_Mat.map = base1;
      materials.Tire_Game_Mat.color = { r: 0.7, g: 0.7, b: 0.7 };
    } else {
      materials.Tire_Game_Mat.map = base2;
      materials.Tire_Game_Mat.color = { r: 0.9, g: 0.9, b: 0.9 };
    }
    materials.Tire_Game_Mat.needsUpdate = true;
  }*/

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.0099}>
        <mesh
          castShadow
          geometry={nodes.Logo_Game_low.geometry}
          material={materials.Logo_Game_Mat}
          position={[-0.001, -6.832, 0]}
          rotation={[0, 0, Math.PI]}
          scale={1.046}
        />
        <mesh
          castShadow
          geometry={nodes.RIM_FULL_Game_low.geometry}
          material={materials.Rim_Game_Mat}
          position={[0.024, -7.003, 0]}
          rotation={[0, 0, Math.PI]}
          scale={1.052}
        />
        <mesh
          castShadow
          geometry={nodes.Tire_Gaming_Low.geometry}
          material={materials.Tire_Game_Mat}
          // onClick={() => {
          //   toggleTireTexture();
          // }}
        />
      </group>
    </group>
  );
}
useGLTF.preload(crossclimateLow);
