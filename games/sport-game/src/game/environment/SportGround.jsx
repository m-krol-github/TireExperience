import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import SportGroundMountains from "../../assets/terrain/SportGroundMountains.glb";
import GroundBase from "../../assets/textures/ground_base_color.jpg";
import GroundMountainsBase from "../../assets/textures/Ground_with_mountains/Ground_with_mountains_BaseColor.jpg";
import GroundMountainsNormal from "../../assets/textures/Ground_with_mountains/Ground_with_mountains_Normal.jpg";

import mountain9basecolor from "../../assets/textures/Ground_with_mountains/mountain_9_Basecolor.jpg";
import mountain8basecolor from "../../assets/textures/Ground_with_mountains/mountain_8_Basecolor.jpg";
import mountain7basecolor from "../../assets/textures/Ground_with_mountains/mountain_7_Basecolor.jpg";
import mountain6basecolor from "../../assets/textures/Ground_with_mountains/mountain_6_Basecolor.jpg";
import mountain5basecolor from "../../assets/textures/Ground_with_mountains/mountain_5_Basecolor.jpg";
import mountain4basecolor from "../../assets/textures/Ground_with_mountains/mountain_4_Basecolor.jpg";

import { MeshStandardMaterial } from "three";
import { interopImage } from "../../helpers/interopImage";

export default function SportGround(props) {
  const { nodes, materials } = useGLTF(SportGroundMountains);

  const [GroundBaseMap] = useTexture([interopImage(GroundBase)]);

  const [MountainBase9Map] = useTexture([interopImage(mountain9basecolor)]);
  const [MountainBase8Map] = useTexture([interopImage(mountain8basecolor)]);
  const [MountainBase7Map] = useTexture([interopImage(mountain7basecolor)]);
  const [MountainBase6Map] = useTexture([interopImage(mountain6basecolor)]);
  const [MountainBase5Map] = useTexture([interopImage(mountain5basecolor)]);
  const [MountainBase4Map] = useTexture([interopImage(mountain4basecolor)]);

  const [GroundMountainsBaseMap, GroundMountainsNormalMap] = useTexture([
    interopImage(GroundMountainsBase),
    interopImage(GroundMountainsNormal),
  ]);

  GroundBaseMap.flipY = false;
  GroundBaseMap.anisotropy = 16;
  GroundMountainsBaseMap.flipY = false;
  GroundMountainsNormalMap.flipY = false;
  MountainBase9Map.flipY = false;
  MountainBase8Map.flipY = false;
  MountainBase7Map.flipY = false;
  MountainBase6Map.flipY = false;
  MountainBase5Map.flipY = false;
  MountainBase4Map.flipY = false;

  const mGroundPlane = useMemo(
    () =>
      new MeshStandardMaterial({
        map: GroundBaseMap,
        toneMapped: false,
      })
  );

  const mGroundMountains = useMemo(
    () =>
      new MeshStandardMaterial({
        map: GroundMountainsBaseMap,
        normalMap: GroundMountainsNormalMap,
        toneMapped: false,
      })
  );

  const mMountain9 = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MountainBase9Map,
        toneMapped: false,
      })
  );

  const mMountain8 = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MountainBase8Map,
        toneMapped: false,
      })
  );

  const mMountain7 = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MountainBase7Map,
        toneMapped: false,
      })
  );
  const mMountain6 = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MountainBase6Map,
        toneMapped: false,
      })
  );
  const mMountain5 = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MountainBase5Map,
        toneMapped: false,
      })
  );
  const mMountain4 = useMemo(
    () =>
      new MeshStandardMaterial({
        map: MountainBase4Map,
        toneMapped: false,
      })
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.pPlane1.geometry}
        material={mGroundPlane}
        position={[0, -0.01, 0]}
      />
      <mesh geometry={nodes.Plane_1.geometry} material={mGroundMountains} />
      <mesh geometry={nodes.mountain_9.geometry} material={mMountain9} />
      <mesh geometry={nodes.mountain_9001.geometry} material={mMountain9} />
      <mesh geometry={nodes.mountain_9002.geometry} material={mMountain9} />
      <mesh geometry={nodes.pasted__montagna5.geometry} material={mMountain5} />
      <mesh geometry={nodes.pasted__montagna4.geometry} material={mMountain4} />
      <mesh geometry={nodes.pasted__montagna6.geometry} material={mMountain6} />
      <mesh geometry={nodes.pasted__montagna7.geometry} material={mMountain7} />
      <mesh geometry={nodes.pasted__montagna8.geometry} material={mMountain8} />
    </group>
  );
}

useGLTF.preload(SportGroundMountains);
useTexture.preload([
  GroundBase,
  mountain9basecolor,
  mountain8basecolor,
  mountain7basecolor,
  mountain6basecolor,
  mountain5basecolor,
  mountain4basecolor,
  GroundMountainsBase,
  GroundMountainsNormal,
]);
