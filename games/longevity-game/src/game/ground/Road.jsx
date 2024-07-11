import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

import { MeshReflectorMaterial, useTexture, useGLTF } from "@react-three/drei";
import { RepeatWrapping } from "three";

import baseRoad from "../../assets/textures/Road/Road_Dry_BaseColor.png";
import roughnessRoad from "../../assets/textures/Road/Road_Dry_Roughness.png";
import normalRoad from "../../assets/textures/Road/Road_Dry_Normal.png";

import { interopImage } from "../../helpers/interopImage";

import { useFrame } from "@react-three/fiber";
import useSpeed from "../stores/useSpeed";

//obsługa terenu, odbicia, tekstury
export default function Road() {
  const distance = useRef({ current: 0, speed: 0 });

  const [base1, normal1, roughness1] = useTexture([
    interopImage(baseRoad),
    interopImage(normalRoad),
    interopImage(roughnessRoad),
  ]);

  base1.wrapS = base1.wrapT = RepeatWrapping;
  base1.repeat.set(1, 6);
  base1.magFilter = THREE.LinearFilter;
  base1.minFilter = THREE.LinearFilter;
  base1.anisotropy = 16;
  normal1.wrapS = normal1.wrapT = RepeatWrapping;
  normal1.repeat.set(1, 6);
  roughness1.wrapS = roughness1.wrapT = RepeatWrapping;
  roughness1.repeat.set(1, 6);

  useFrame((state, delta) => {
    distance.current.elapsed += (distance.current.speed * delta) / 200;
    let t = distance.current.elapsed;
    base1.offset.y = t;
    normal1.offset.y = t;
    roughness1.offset.y = t;
  });

  useEffect(() => {
    distance.current.elapsed = 0;
    distance.current.speed = 0;

    const unsubsribeDist = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        distance.current.speed = value;
      }
    );

    return () => {
      unsubsribeDist();
    };
  }, []);

  return (
    <mesh rotation-x={-Math.PI * 0.5} position={[0, 0, -100]} receiveShadow>
      <planeGeometry args={[30, 250]} />
      <meshStandardMaterial
        map={base1}
        roughnessMap={roughness1}
        roughness={0.68}
        normalMap={normal1}
        metalness={0}
        toneMapped={false}
        anisotropy={10}
      />
    </mesh>
  );
}

useTexture.preload([baseRoad, normalRoad, roughnessRoad]);
