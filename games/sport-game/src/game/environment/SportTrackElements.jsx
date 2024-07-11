import React, { useRef, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import TrackElements from "../../assets/terrain/SportTrackElements.glb";
import CurveDelineatorBase from "../../assets/textures/curve_delineator_base_color.jpg";
import BillboardBase from "../../assets/textures/billboard_BaseColor.jpg";
import StopLightBase from "../../assets/textures/stoplight/stoplight_BaseColor.jpg";
import StopLightRough from "../../assets/textures/stoplight/stoplight_Roughness.jpg";
import GrandStand from "../../assets/textures/Grandstand_BaseColor.jpg";
import TrafficCone from "../../assets/textures/Traffic_cone_texture/traffic_cone_Basecolor.jpg";
import TrafficConeMetallic from "../../assets/textures/Traffic_cone_texture/traffic_cone_Metallic.jpg";
import TrafficConeRoughness from "../../assets/textures/Traffic_cone_texture/traffic_cone_Roughness.jpg";
import internalCurbBase from "../../assets/textures/internal_curb/internal_curb_BaseColor.jpg";
import internalCurbRoughness from "../../assets/textures/internal_curb/internal_curb_Roughness.jpg";

import { MeshStandardMaterial, MeshBasicMaterial } from "three";
import { interopImage } from "../../helpers/interopImage";

export default function SportTrackElements2(props) {
  const { nodes } = useGLTF(TrackElements);

  const [BillboardBaseMap] = useTexture([interopImage(BillboardBase)]);
  const [CurveDelineatorBaseMap] = useTexture([
    interopImage(CurveDelineatorBase),
  ]);
  const [GrandStandMap] = useTexture([interopImage(GrandStand)]);

  const [TrafficConeBaseMap, TrafficConeMetalMap, TrafficConeRoughMap] =
    useTexture([
      interopImage(TrafficCone),
      interopImage(TrafficConeMetallic),
      interopImage(TrafficConeRoughness),
    ]);

  const [StopLightBaseMap, StopLightRoughMap] = useTexture([
    interopImage(StopLightBase),
    interopImage(StopLightRough),
  ]);

  const [internalCurbBaseMap, internalCurbRoughnessMap] = useTexture([
    interopImage(internalCurbBase),
    interopImage(internalCurbRoughness),
  ]);

  internalCurbBaseMap.wrapT = 10;
  internalCurbBaseMap.anisotropy = 16;
  internalCurbRoughnessMap.wrapT = 10;
  internalCurbRoughnessMap.anisotropy = 16;

  BillboardBaseMap.flipY = false;
  GrandStandMap.flipY = false;

  const mBillboard = useMemo(
    () =>
      new MeshBasicMaterial({
        map: BillboardBaseMap,
        toneMapped: false,
      })
  );

  const mCurve = useMemo(
    () =>
      new MeshBasicMaterial({
        map: CurveDelineatorBaseMap,
        toneMapped: false,
      })
  );

  const mStopLight = useMemo(
    () =>
      new MeshBasicMaterial({
        map: StopLightBaseMap,
        // roughnessMap: StopLightRoughMap,
        toneMapped: false,
      })
  );

  const mStand = useMemo(
    () =>
      new MeshStandardMaterial({
        map: GrandStandMap,
        toneMapped: false,
      })
  );

  const mTrafficCone = useMemo(
    () =>
      new MeshStandardMaterial({
        map: TrafficConeBaseMap,
        roughnessMap: TrafficConeRoughMap,
        metalnessMap: TrafficConeMetalMap,
        toneMapped: false,
      })
  );

  const mSideLines = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#f6e930",
        toneMapped: false,
      })
  );

  const mSweeps = useMemo(
    () =>
      new MeshStandardMaterial({
        map: internalCurbBaseMap,
        toneMapped: false,
      })
  );

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.sweep5.geometry} material={mSweeps} />
      <mesh geometry={nodes.sweep6.geometry} material={mSweeps} />
      <mesh geometry={nodes.semaforo_001.geometry} material={mStopLight} />
      <mesh geometry={nodes.semaforo_002.geometry} material={mStopLight} />
      <mesh geometry={nodes.semaforo_003.geometry} material={mStopLight} />
      <mesh geometry={nodes.semaforo_004.geometry} material={mStopLight} />
      <mesh geometry={nodes.semaforo_005.geometry} material={mStopLight} />
      <mesh
        geometry={nodes.striscia_gialla.geometry}
        material={mSideLines}
        position={[0, 0.002, 0]}
      />
      <mesh
        geometry={nodes.striscia_gialla_001.geometry}
        material={mSideLines}
        position={[0, 0.002, 0]}
      />
      <mesh geometry={nodes.pPlane2.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane2001.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane4.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane5.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane2002.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane2003.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane2004.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane3.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane2005.geometry} material={mCurve} />
      <mesh geometry={nodes.pPlane2006.geometry} material={mCurve} />
      <mesh geometry={nodes.Traffic_Cone23.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone24.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone25.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone26.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone27.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone28.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone29.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone30.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone31.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone32.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone33.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone34.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone35.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone36.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone4.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.Traffic_Cone7.geometry} material={mTrafficCone} />
      <mesh geometry={nodes.pCube7.geometry} material={mStopLight} />
      <mesh geometry={nodes.pPlane15.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane19.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane20.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane21.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane22.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane23.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane24.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane25.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane26.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane27.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane28.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane29.geometry} material={mBillboard} />
      <mesh geometry={nodes.pPlane30.geometry} material={mBillboard} />
      <mesh geometry={nodes.pasted__pCylinder21.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCylinder22.geometry} material={mStand} />
      <mesh
        geometry={nodes.pasted__pCylinder21001.geometry}
        material={mStand}
      />
      <mesh
        geometry={nodes.pasted__pCylinder22001.geometry}
        material={mStand}
      />
      <mesh geometry={nodes.pasted__pCube38.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCylinder20.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube49.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube50.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube51.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube52.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube53.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube54.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube55.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube56.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube57.geometry} material={mStand} />
      <mesh geometry={nodes.pasted__pCube58.geometry} material={mStand} />
    </group>
  );
}

useGLTF.preload(TrackElements);
useTexture.preload([
  BillboardBase,
  CurveDelineatorBase,
  GrandStand,
  TrafficCone,
  TrafficConeMetallic,
  TrafficConeRoughness,
  StopLightBase,
  StopLightRough,
]);
