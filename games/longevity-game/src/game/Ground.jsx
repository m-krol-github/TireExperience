import * as THREE from "three";
import React, { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, useTexture, useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, RepeatWrapping } from "three";

import useSpeed from "./stores/useSpeed";

//import baseRoad from "../assets/textures/Road/Road_Dry_BaseColor.png";
//import roughnessRoad from "../assets/textures/Road/Road_Dry_Roughness.png";
//import normalRoad from "../assets/textures/Road/Road_Dry_Normal.png";

/*import baseSidewalk from "../assets/textures/Sidewalk/Sidewalk_1_BaseColor.png";
import roughnessSidewalk from "../assets/textures/Sidewalk/Sidewalk_1_Roughness.png";
import normalSidewalk from "../assets/textures/Sidewalk/Sidewalk_1_Normal.png";*/

import { interopImage } from "../helpers/interopImage";
import SideMaterial from "./ground/SideMaterial";
import Road from "./ground/Road";

//obsługa terenu, odbicia, tekstury
export default function Ground() {
  /*const [base1, normal1, roughness1] = useTexture([
    interopImage(baseRoad),
    interopImage(normalRoad),
    interopImage(roughnessRoad),
  ]);*/

  /*base1.wrapS = base1.wrapT = RepeatWrapping;
  base1.repeat.set(1, 6);
  base1.magFilter = THREE.LinearFilter;
  base1.minFilter = THREE.LinearFilter;
  base1.anisotropy = 16;
  normal1.wrapS = normal1.wrapT = RepeatWrapping;
  normal1.repeat.set(1, 6);
  roughness1.wrapS = roughness1.wrapT = RepeatWrapping;
  roughness1.repeat.set(1, 6);*/

  return (
    <>
      <Road />

      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[-17.5, 0, -100]}
        receiveShadow
      >
        <meshStandardMaterial
          color={"#4886da"}
          toneMapped={false}
          roughness={1}
        />
        <planeGeometry args={[5, 250]} />
      </mesh>
      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[17.5, 0, -100]}
        receiveShadow
      >
        <meshStandardMaterial
          color={"#4886da"}
          toneMapped={false}
          roughness={1}
        />
        <planeGeometry args={[5, 250]} />
      </mesh>
      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[-45, 0.2, -100]}
        receiveShadow
      >
        <SideMaterial />
        <boxGeometry args={[50, 250, 0.4]} />
      </mesh>
      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[45, 0.2, -100]}
        receiveShadow
      >
        <SideMaterial />
        <boxGeometry args={[50, 250, 0.4]} />
      </mesh>
    </>
  );
}

//useTexture.preload([baseRoad, normalRoad, roughnessRoad]);

/*useTexture.preload("../assets/textures/Road/Road_Wet_BaseColor.png");
useTexture.preload("../assets/textures/Road/Road_Wet_Normal.png");
useTexture.preload("../assets/textures/Road/Road_Wet_Roughness.png");

useTexture.preload("../assets/textures/Sidewalk/Sidewalk_BaseColor.png");
useTexture.preload("../assets/textures/Sidewalk/Sidewalk_Normal.png");
useTexture.preload("../assets/textures/Sidewalk/Sidewalk_Roughness.png");*/
