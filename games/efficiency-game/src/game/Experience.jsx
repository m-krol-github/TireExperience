import {
  Environment,
  OrbitControls,
  useTexture,
  Billboard,
  GradientTexture,
  Shadow,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Wheel from "./Wheel";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Speed from "./Speed";
import Ground from "./Ground";
import useGame from "./stores/useGame";
import { Physics } from "@react-three/rapier";
import { Obstacles } from "./Obstacles";
import Controller from "./Controller";
import { UsaLandscape } from "./usa/UsaLandscape";

export default function Experience() {
  const road = useRef();
  const phase = useGame((state) => state.phase);

  return (
    <>
      <Perf position="top-left" />
      {/* <Shadow
        color="black"
        colorStop={0}
        opacity={1}
        fog={false} // Reacts to fog (default=false)
      /> */}
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        intensity={2}
        position={[0, 6, -2]}
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

      {/* <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <mesh position={[0, 0, -150]}>
          <planeGeometry args={[500, 200]} />
          <meshBasicMaterial>
            <GradientTexture
              stops={[0, 1]} // As many stops as you want
              colors={["blue", "black"]} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh>
      </Billboard> */}
    </>
  );
}
