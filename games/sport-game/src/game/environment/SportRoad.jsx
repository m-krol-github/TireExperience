import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import Road from "../../assets/terrain/SportRoad.glb";
import RoadBase from "../../assets/textures/road_texture/road_Basecolor.jpg";
import RoadNormal from "../../assets/textures/road_texture/road_Normal.jpg";
import RoadRoughness from "../../assets/textures/road_texture/road_Roughness.jpg";
import RoadWetBase from "../../assets/textures/road_wet_texture/wet_road_Basecolor.jpg";
import RoadWetNormal from "../../assets/textures/road_wet_texture/road_Normal_transition.jpg";
import RoadWetRoughness from "../../assets/textures/road_wet_texture/road_Roughness_transition.jpg";

import { MeshStandardMaterial } from "three";
import { interopImage } from "../../helpers/interopImage";

export default function SportRoad(props) {
  const { nodes } = useGLTF(Road);

  const [RoadBaseMap, RoadNormalMap, RoadRoughnessMap] = useTexture([
    interopImage(RoadBase),
    interopImage(RoadNormal),
    interopImage(RoadRoughness),
  ]);

  const [RoadWetBaseMap, RoadWetNormalMap, RoadWetRoughnessMap] = useTexture([
    interopImage(RoadWetBase),
    interopImage(RoadWetNormal),
    interopImage(RoadWetRoughness),
  ]);

  RoadBaseMap.wrapT = 10;
  RoadBaseMap.anisotropy = 16;
  RoadNormalMap.wrapT = 10;
  RoadRoughnessMap.wrapT = 10;
  RoadWetBaseMap.wrapT = 10;
  RoadWetBaseMap.anisotropy = 16;
  RoadWetNormalMap.wrapT = 10;
  RoadWetRoughnessMap.wrapT = 10;

  const mRoad = useMemo(
    () =>
      new MeshStandardMaterial({
        map: RoadBaseMap,
        roughnessMap: RoadRoughnessMap,
        normalMap: RoadNormalMap,
        toneMapped: false,
      })
  );

  /* wet road material */
  const mWetRoad = useMemo(
    () =>
      new MeshStandardMaterial({
        map: RoadWetBaseMap,
        roughnessMap: RoadWetRoughnessMap,
        normalMap: RoadWetNormalMap,
        toneMapped: false,
      })
  );

  return (
    <group {...props} dispose={null} position={[2.6, 1.0, -1]}>
      <mesh receiveShadow geometry={nodes.Fill_2.geometry} material={mRoad} />
      <mesh
        receiveShadow
        geometry={nodes.Fill_3.geometry}
        material={mWetRoad}
      />
      <mesh receiveShadow geometry={nodes.Fill_4.geometry} material={mRoad} />
      <mesh receiveShadow geometry={nodes.Fill_5.geometry} material={mRoad} />
    </group>
  );
}

useGLTF.preload(Road);
useTexture.preload([
  RoadBase,
  RoadNormal,
  RoadRoughness,
  RoadWetBase,
  RoadWetNormal,
  RoadWetRoughness,
]);
