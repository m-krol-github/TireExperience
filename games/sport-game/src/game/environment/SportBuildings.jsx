import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import BuildingsModels from "../../assets/terrain/SportBuildings.glb";
import BuildingBase from "../../assets/textures/building_Basecolor.jpg";
import BuildingWindows from "../../assets/textures/buildingWindows.jpg";

import { MeshStandardMaterial } from "three";
import { interopImage } from "../../helpers/interopImage";

export default function SportBuildings2(props) {
  const { nodes, materials } = useGLTF(BuildingsModels);

  const [BuildingBaseMap] = useTexture([interopImage(BuildingBase)]);
  const [BuildingWindowMap] = useTexture([interopImage(BuildingWindows)]);

  const mBuildingBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: BuildingBaseMap,
        toneMapped: false,
      })
  );

  const mBuildingWindow = useMemo(
    () =>
      new MeshStandardMaterial({
        map: BuildingWindowMap,
        toneMapped: false,
      })
  );

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.fasade6.geometry} material={mBuildingBase} />
      <mesh geometry={nodes.fasade3.geometry} material={mBuildingBase} />
      <mesh geometry={nodes.fasade2.geometry} material={mBuildingBase} />
      <mesh geometry={nodes.fasade.geometry} material={mBuildingBase} />
      <mesh geometry={nodes.windowses.geometry} material={mBuildingWindow} />
      <mesh geometry={nodes.windowses2.geometry} material={mBuildingWindow} />
      <mesh geometry={nodes.fasade001.geometry} material={mBuildingBase} />
      <mesh geometry={nodes.windowses001.geometry} material={mBuildingWindow} />
      <mesh geometry={nodes.fasade2001.geometry} material={mBuildingBase} />
      <mesh
        geometry={nodes.windowses2001.geometry}
        material={mBuildingWindow}
      />
      <mesh geometry={nodes.windowses3.geometry} material={mBuildingWindow} />
      <mesh geometry={nodes.fasade4.geometry} material={mBuildingBase} />
      <mesh geometry={nodes.windowses4.geometry} material={mBuildingWindow} />
      <mesh geometry={nodes.windowses5.geometry} material={mBuildingWindow} />
    </group>
  );
}

useGLTF.preload(BuildingsModels);
useTexture.preload([BuildingBase, BuildingWindows]);
