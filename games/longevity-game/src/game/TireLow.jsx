import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { MeshMatcapMaterial } from "three";

import defenderTire from "../assets/Defender2/Defender2_Game_Embedded_V01.glb";

import defenderTireBase from "../assets/Defender2/textures/Defender2_Tire_GameBaseColor.png";
import defenderTireNormal from "../assets/Defender2/textures/Defender2_Tire_GameNormal.png";
import defenderTireRough from "../assets/Defender2/textures/Defender2_Tire_GameRoughness.png";

import defenderRimBase from "../assets/Defender2/textures/Defender2_Rim_GameBaseColor.png";
import defenderRimNormal from "../assets/Defender2/textures/Defender2_Rim_GameNormal.png";
import defenderRimRough from "../assets/Defender2/textures/Defender2_Rim_GameRoughness.png";

import { interopImage } from "../helpers/interopImage";

//klasa z przykładową oponą low poly pbr
export default function TireLow(props) {
  const { nodes, materials } = useGLTF(defenderTire);

  const [tireBase, tireNormal, tireRough] = useTexture([
    interopImage(defenderTireBase),
    interopImage(defenderTireNormal),
    interopImage(defenderTireRough),
  ]);

  tireBase.flipY = tireNormal.flipY = tireRough.flipY = false;

  const [rimBase, rimNormal, rimRough] = useTexture([
    interopImage(defenderRimBase),
    interopImage(defenderRimNormal),
    interopImage(defenderRimRough),
  ]);

  rimBase.flipY = rimNormal.flipY = rimRough.flipY = false;

  // materials.Logo_Game_Mat.toneMapped = false;
  // materials.Defender2_Tire_Game_Mat.toneMapped = false;
  // materials.Defender2_Tire_Game_Mat.roughness = 1;
  // materials.Defender2_Tire_Game_Mat.color = { r: 0.9, g: 0.9, b: 0.9 };
  // materials.Defender2_Rim_Game_Mat.toneMapped = false;
  // materials.Defender2_Rim_Game_Mat.metalness = 0.2;
  // materials.Defender2_Rim_Game_Mat.roughness = 0;

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.0087}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Defender2_Logo_Game_low.geometry}
          material={materials.Logo_Game_Mat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Defender2_Tire_Game_low.geometry}
          // material={materials.Defender2_Tire_Game_Mat}
        >
          <meshStandardMaterial
            map={tireBase}
            normalMap={tireNormal}
            roughnessMap={tireRough}
            roughness={0.9}
            toneMapped={false}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Defender_2_Rim_Game_low.geometry}
          material={materials.Defender2_Rim_Game_Mat}
        >
          <meshStandardMaterial
            map={rimBase}
            color={"#ffffff"}
            normalMap={rimNormal}
            roughnessMap={rimRough}
            roughness={1}
            metalness={0.4}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(defenderTire);
useTexture.preload([defenderRimBase, defenderRimNormal, defenderRimRough]);
useTexture.preload([defenderTireBase, defenderTireNormal, defenderTireRough]);
