import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, useTexture, useGLTF } from "@react-three/drei";
import { MeshStandardMaterial, RepeatWrapping } from "three";

import useSpeed from "./stores/useSpeed";

import baseRoad from "../assets/textures/Road/Road_Dry_BaseColor.png";
import roughnessRoad from "../assets/textures/Road/Road_Dry_Roughness.png";
import normalRoad from "../assets/textures/Road/Road_Dry_Normal.png";

import baseSidewalk from "../assets/textures/Sidewalk/Sidewalk_1_BaseColor.png";
import roughnessSidewalk from "../assets/textures/Sidewalk/Sidewalk_1_Roughness.png";
import normalSidewalk from "../assets/textures/Sidewalk/Sidewalk_1_Normal.png";

import { interopImage } from "../helpers/interopImage";

//obsługa terenu, odbicia, tekstury
export default function Ground() {
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

  const [baseSide, normalSide, roughnessSide] = useTexture([
    interopImage(baseSidewalk),
    interopImage(roughnessSidewalk),
    interopImage(normalSidewalk),
  ]);

  baseSide.wrapS = baseSide.wrapT = RepeatWrapping;
  baseSide.repeat.set(1, 6);
  normalSide.wrapS = normalSide.wrapT = RepeatWrapping;
  normalSide.repeat.set(1, 6);
  roughnessSide.wrapS = roughnessSide.wrapT = RepeatWrapping;
  roughnessSide.repeat.set(1, 6);

  useFrame((state, delta) => {
    distance.elapsed += (distance.speed * delta) / 200;
    let t = distance.elapsed;
    base1.offset.y = t;
    normal1.offset.y = t;
    roughness1.offset.y = t;

    baseSide.offset.y = t;
    normalSide.offset.y = t;
    roughnessSide.offset.y = t;
  });

  const distance = useRef({});

  useEffect(() => {
    distance.elapsed = 0;
    distance.speed = 0;

    const unsubsribeDist = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        distance.speed = value;
      }
    );

    return () => {
      unsubsribeDist();
    };
  }, []);

  return (
    <>
      <mesh rotation-x={-Math.PI * 0.5} position={[0, 0, -80]} receiveShadow>
        <planeGeometry args={[30, 250]} />
        <MeshReflectorMaterial
          mixBlur={5}
          blur={[280 * 2, 280]}
          resolution={512}
          mixStrength={0.5}
          map={base1}
          mirror={0.5}
          roughnessMap={roughness1}
          roughness={0.68}
          normalMap={normal1}
          depthScale={1.08}
          dithering={true}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          metalness={0}
          toneMapped={false}
          anisotropy={10}
        />
      </mesh>
      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[-17.5, 0, -80]}
        receiveShadow
      >
        <meshStandardMaterial color={"#4886da"} toneMapped={false} />
        <planeGeometry args={[5, 250]} />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} position={[17.5, 0, -80]} receiveShadow>
        <meshStandardMaterial color={"#4886da"} toneMapped={false} />
        <planeGeometry args={[5, 250]} />
      </mesh>
      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[-45, 0.2, -80]}
        receiveShadow
      >
        <MeshReflectorMaterial
          mixBlur={5}
          blur={[280 * 2, 280]}
          resolution={512}
          mixStrength={0.5}
          mirror={0}
          map={baseSide}
          normalMap={normalSide}
          roughnessMap={roughnessSide}
          roughness={0.68}
          depthScale={1.08}
          dithering={true}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          metalness={0}
          toneMapped={false}
        />
        <boxGeometry args={[50, 250, 0.4]} />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} position={[45, 0.2, -80]} receiveShadow>
        <MeshReflectorMaterial
          mixBlur={5}
          blur={[280 * 2, 280]}
          resolution={512}
          mixStrength={0.5}
          mirror={0}
          map={baseSide}
          normalMap={normalSide}
          roughnessMap={roughnessSide}
          roughness={0.68}
          depthScale={1.08}
          dithering={true}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          metalness={0}
          toneMapped={false}
        />
        <boxGeometry args={[50, 250, 0.4]} />
      </mesh>
    </>
  );
}

useTexture.preload("../assets/textures/Road/Road_Wet_BaseColor.png");
useTexture.preload("../assets/textures/Road/Road_Wet_Normal.png");
useTexture.preload("../assets/textures/Road/Road_Wet_Roughness.png");

useTexture.preload("../assets/textures/Sidewalk/Sidewalk_BaseColor.png");
useTexture.preload("../assets/textures/Sidewalk/Sidewalk_Normal.png");
useTexture.preload("../assets/textures/Sidewalk/Sidewalk_Roughness.png");
