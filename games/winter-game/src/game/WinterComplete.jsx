import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import winter from "../assets/terrain/winterComplete.glb";

import newBaseTerrain from "../assets/textures/ground_BaseColor.jpg";
import newBaseNormal from "../assets/textures/Ground_Normal.jpg";

import roadBase from "../assets/textures/baseRoad/roadBaseColor.png";
import roadNormal from "../assets/textures/baseRoad/roadNormal.png";
import roadRoughness from "../assets/textures/baseRoad/roadRoughness.png";

import iceRoadBase from "../assets/textures/iceRoad/iceRoadBaseColor.png";
import iceRoadNormal from "../assets/textures/iceRoad/iceRoadNormal.png";
import iceRoadRoughness from "../assets/textures/iceRoad/iceRoadRoughness.png";

import mountainBase2 from "../assets/textures/mountain_2_Basecolor.jpg";
import mountainBase3 from "../assets/textures/mountain_3_Basecolor.jpg";
import mountainBase4 from "../assets/textures/mountain_4_Basecolor.jpg";
import mountainBase5 from "../assets/textures/mountain_5_Basecolor.jpg";
import mountainBase6 from "../assets/textures/mountain_6_Basecolor.jpg";
import mountainBase7 from "../assets/textures/mountain_7_Basecolor.jpg";
import mountainBase8 from "../assets/textures/mountain_8_Basecolor.jpg";
import mountainBase9 from "../assets/textures/mountain_9_Basecolor.jpg";
import mountainBase10 from "../assets/textures/mountain_10_Basecolor.jpg";

import treeBase from "../assets/textures/pineTreeBasecolor.png";

import { interopImage } from "../helpers/interopImage";
import { MeshStandardMaterial } from "three";

export function WinterComplete(props) {
  const { nodes, materials } = useGLTF(winter);

  console.log("winter complete ");

  const [baseMap, normalMap] = useTexture([
    interopImage(newBaseTerrain),
    interopImage(newBaseNormal),
  ]);

  baseMap.flipY = false;
  normalMap.flipY = false;

  const [roadMap, roadNormalMap, roadRoughnessMap] = useTexture([
    interopImage(roadBase),
    interopImage(roadNormal),
    interopImage(roadRoughness),
  ]);

  const [iceRoadBaseMap, iceRoadNormalMap, iceRoadRoughnessMap] = useTexture([
    interopImage(iceRoadBase),
    interopImage(iceRoadNormal),
    interopImage(iceRoadRoughness),
  ]);

  const [
    mountainBaseMap2,
    mountainBaseMap3,
    mountainBaseMap4,
    mountainBaseMap5,
    mountainBaseMap6,
    mountainBaseMap7,
    mountainBaseMap8,
    mountainBaseMap9,
    mountainBaseMap10,
  ] = useTexture([
    interopImage(mountainBase2),
    interopImage(mountainBase3),
    interopImage(mountainBase4),
    interopImage(mountainBase5),
    interopImage(mountainBase6),
    interopImage(mountainBase7),
    interopImage(mountainBase8),
    interopImage(mountainBase9),
    interopImage(mountainBase10),
  ]);

  const [treeBaseMap] = useTexture([interopImage(treeBase)]);

  roadMap.wrapT = 20;
  roadNormalMap.wrapT = 20;
  roadRoughnessMap.wrapT = 20;

  iceRoadBaseMap.wrapT = 20;
  iceRoadNormalMap.wrapT = 20;
  iceRoadRoughnessMap.wrapT = 20;

  treeBaseMap.flipY = false;
  mountainBaseMap2.flipY = false;
  mountainBaseMap3.flipY = false;
  mountainBaseMap4.flipY = false;
  mountainBaseMap5.flipY = false;
  mountainBaseMap6.flipY = false;
  mountainBaseMap7.flipY = false;
  mountainBaseMap8.flipY = false;
  mountainBaseMap9.flipY = false;
  mountainBaseMap10.flipY = false;

  const mBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: baseMap,
        normalMap: normalMap,
        toneMapped: false,
      })
  );

  const mRoad = useMemo(
    () =>
      new MeshStandardMaterial({
        map: roadMap,
        normalMap: roadNormalMap,
        roughness: roadRoughnessMap,
        toneMapped: false,
      })
  );

  const mIceRoad = useMemo(
    () =>
      new MeshStandardMaterial({
        map: iceRoadBaseMap,
        normalMap: iceRoadNormalMap,
        roughness: iceRoadRoughnessMap,
        sheen: 1,
        opacity: 0.1,
        reflectivity: 1,
        toneMapped: false,
      })
  );

  const mTree = useMemo(
    () =>
      new MeshStandardMaterial({
        map: treeBaseMap,
        toneMapped: false,
      })
  );

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.montagna2.geometry} position={[30, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap2} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.montagna3.geometry} position={[30, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap3} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.montagna4.geometry} position={[30, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap4} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.montagna5.geometry} position={[30, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap5} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.montagna6.geometry} position={[20, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap6} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.montagna7.geometry} position={[20, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap7} toneMapped={false} />
      </mesh>{" "}
      <mesh geometry={nodes.montagna8.geometry} position={[30, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap8} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.montagna9.geometry} position={[30, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap9} toneMapped={false} />
      </mesh>
      <mesh geometry={nodes.montagna10.geometry} position={[30, 40, 50]}>
        <meshStandardMaterial map={mountainBaseMap10} toneMapped={false} />
      </mesh>
      <mesh
        receiveShadow
        geometry={nodes.strada.geometry}
        material={mRoad}
        position={[20, 40, 50]}
      />
      <mesh
        receiveShadow
        geometry={nodes.strada_ghiacciata.geometry}
        material={mIceRoad}
        position={[20, 40.2, 50]}
      />
      <mesh
        receiveShadow
        geometry={nodes.terreno1.geometry}
        material={mBase}
        position={[20, 40, 50]}
      />
      <mesh
        castShadow
        geometry={nodes.tree.geometry}
        material={mTree}
        position={[-11.23, 5.942, -105.051]}
      />
      <mesh
        castShadow
        geometry={nodes.tree001.geometry}
        material={mTree}
        position={[19.191, 7.049, -113.101]}
      />
      <mesh
        castShadow
        geometry={nodes.tree002.geometry}
        material={mTree}
        position={[-24.895, 6.161, -102.378]}
      />
      <mesh
        castShadow
        geometry={nodes.tree003.geometry}
        material={mTree}
        position={[44.882, 10.15, -120.212]}
      />
      <mesh
        castShadow
        geometry={nodes.tree004.geometry}
        material={mTree}
        position={[-16.939, 37.293, -198.03]}
      />
      <mesh
        castShadow
        geometry={nodes.tree005.geometry}
        material={mTree}
        position={[5.362, 29.837, -237.602]}
      />
      <mesh
        castShadow
        geometry={nodes.tree006.geometry}
        material={mTree}
        position={[17.696, 24.931, -254.33]}
      />
      <mesh
        castShadow
        geometry={nodes.tree007.geometry}
        material={mTree}
        position={[11.954, 15.361, -340.612]}
      />
      <mesh
        castShadow
        geometry={nodes.tree008.geometry}
        material={mTree}
        position={[21.831, 29.912, -409.287]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree009.geometry}
        material={mTree}
        position={[7.053, 34.145, -473.578]}
      />
    </group>
  );
}

useGLTF.preload(winter);
useTexture.preload([roadBase, roadNormal, roadRoughness]);
useTexture.preload([iceRoadBase, iceRoadNormal, iceRoadRoughness]);
useTexture.preload([
  mountainBase2,
  mountainBase3,
  mountainBase4,
  mountainBase5,
  mountainBase6,
  mountainBase7,
  mountainBase8,
  mountainBase9,
  mountainBase10,
]);
