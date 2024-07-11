import {
  Environment,
  OrbitControls,
  useTexture,
  Billboard,
  GradientTexture,
  CameraControls,
  Shadow,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";

import Wheel from "./Wheel";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import Speed from "./Speed";
import Ground from "./Ground";

import { Physics } from "@react-three/rapier";
import { Obstacles } from "./Obstacles";
import Controller from "./Controller";
import { UsaLandscape } from "./usa/UsaLandscape";
import envMap from "../assets/textures/GlazedPatio_BW.exr";
import { Leva, useControls, button, folder } from "leva";
import { AudioController } from "./AudioController";
import CameraController from "./common-comps/CameraController";

export default function Experience() {
  const road = useRef();
  const boundingSphere = useRef();
  const cameraControlsRef = useRef();

  const viewport = useThree((state) => state.viewport);

  const { envMapIntensity, envRotation, envBlur } = useControls(
    "environment map",
    {
      envMapIntensity: { value: 0.25, min: 0, max: 5 },
      envRotation: { value: 2.6, min: -Math.PI, max: Math.PI },
      envBlur: { value: 0.8, min: 0, max: 1 },
    },
    { collapsed: true }
  );

  return (
    <>
      <Perf position="top-left" />
      <CameraController
        targetVec={[0, 8, 0]}
        positionVec={[0, 11, 20]}
        controlsEnabled={true}
        min={0.65}
        max={0.8}
        dollyBase={20}
      />

      <Environment
        files={envMap}
        backgroundBlurriness={envBlur}
        environmentIntensity={envMapIntensity}
        resolution={32}
        environmentRotation={[0, envRotation, 0]}
        backgroundRotation={[0, envRotation, 0]}
      />

      <ambientLight intensity={2.2} />
      <directionalLight
        castShadow
        intensity={2}
        position={[0, 6, 0]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={180}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />

      <Speed />
      <Physics debug>
        <Wheel></Wheel>
        <Obstacles></Obstacles>
        <Controller></Controller>
      </Physics>

      <Ground />
      <UsaLandscape />
      <AudioController />

      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <mesh position={[0, 50, -250]}>
          <planeGeometry args={[800, 300]} />
          <meshBasicMaterial toneMapped={false}>
            <GradientTexture
              stops={[0.35, 0.8]} // As many stops as you want
              colors={["#123c86", "#96abb6"]} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh>
      </Billboard>
    </>
  );
}
