import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

import useSpeed from "./stores/useSpeed";

import baseRoad from "../assets/textures/Road/Road_Wet_BaseColor.png";
import roughnessRoad from "../assets/textures/Road/Road_Wet_Roughness.png";
import normalRoad from "../assets/textures/Road/Road_Wet_Normal.png";

import baseSidewalk from "../assets/textures/Sidewalk/Sidewalk_BaseColor.png";
import normalSidewalk from "../assets/textures/Sidewalk/Sidewalk_Normal.png";
import roughnessSidewalk from "../assets/textures/Sidewalk/Sidewalk_Roughness.png";

import { interopImage } from "../helpers/interopImage";

//obsługa terenu, odbicia, tekstury
export default function Ground() {
  const [base1, normal1, roughness1] = useTexture([
    interopImage(baseRoad),
    interopImage(normalRoad),
    interopImage(roughnessRoad),
  ]);

  const [base2, normal2, roughness2] = useTexture([
    interopImage(baseSidewalk),
    interopImage(normalSidewalk),
    interopImage(roughnessSidewalk),
  ]);

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

  base1.wrapS = base1.wrapT = RepeatWrapping;
  base1.repeat.set(1, 10);
  normal1.wrapS = normal1.wrapT = RepeatWrapping;
  normal1.repeat.set(1, 10);
  roughness1.wrapS = roughness1.wrapT = RepeatWrapping;
  roughness1.repeat.set(1, 10);

  // useEffect(() => {
  //   [(base1, normal1, roughness1)].forEach((t) => {
  //     t.wrapS = t.wrapT = RepeatWrapping;
  //     t.repeat.set(1, 5);
  //     t.offset.set(0, 0);
  //   });
  // }, [base1, normal1, roughness1]);

  base2.wrapS = base2.wrapT = RepeatWrapping;
  base2.repeat.set(1, 10);
  normal2.wrapS = normal2.wrapT = RepeatWrapping;
  normal2.repeat.set(1, 10);
  roughness2.wrapS = roughness2.wrapT = RepeatWrapping;
  roughness2.repeat.set(1, 10);

  // useEffect(() => {
  //   [base2, normal2, roughness2].forEach((t) => {
  //     t.wrapS = t.wrapT = RepeatWrapping;
  //     t.repeat.set(2, 5);
  //     t.offset.set(0, 0);
  //   });
  // }, [base2, normal2, roughness2]);

  useFrame((state, delta) => {
    distance.elapsed += (distance.speed * delta) / 100;
    let t = distance.elapsed;
    base1.offset.y = t;
    normal1.offset.y = t;
    roughness1.offset.y = t;

    base2.offset.y = t;
    normal2.offset.y = t;
    roughness2.offset.y = t;
  });

  return (
    <>
      <mesh rotation-x={-Math.PI * 0.5} position={[-5, 0, -110]} receiveShadow>
        <planeGeometry args={[30, 300]} />
        <MeshReflectorMaterial
          mixBlur={8}
          blur={[180 * 2, 180]}
          resolution={512}
          mixStrength={3}
          map={base1}
          mirror={0.5}
          roughnessMap={roughness1}
          roughness={0.5}
          normalMap={normal1}
          depthScale={1.08}
          dithering={true}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} receiveShadow position={[25, 0, -110]}>
        <planeGeometry args={[30, 300]} />
        <MeshReflectorMaterial
          mixBlur={2}
          blur={[280 * 2, 300]}
          resolution={512}
          mixStrength={2}
          map={base2}
          mirror={0.5}
          roughnessMap={roughness2}
          roughness={0.4}
          normalMap={normal2}
          depthScale={1.08}
          dithering={true}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} receiveShadow position={[-35, 0, -110]}>
        <planeGeometry args={[30, 300]} />
        <MeshReflectorMaterial
          mixBlur={1.5}
          blur={[280 * 2, 280]}
          resolution={512}
          mixStrength={2}
          map={base2}
          mirror={0.5}
          roughnessMap={roughness2}
          roughness={0.75}
          normalMap={normal2}
          depthScale={1.08}
          dithering={true}
          minDepthThreshold={1}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} receiveShadow position={[-65, 0, -110]}>
        <planeGeometry args={[30, 300]} />
        <MeshReflectorMaterial
          mixBlur={1.5}
          blur={[280 * 2, 280]}
          resolution={512}
          mixStrength={2}
          map={base2}
          mirror={0.5}
          roughnessMap={roughness2}
          roughness={0.68}
          normalMap={normal2}
          depthScale={1.08}
          dithering={true}
          minDepthThreshold={1}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

useTexture.preload([baseRoad, normalRoad, roughnessRoad]);
useTexture.preload([baseSidewalk, normalSidewalk, roughnessSidewalk]);
