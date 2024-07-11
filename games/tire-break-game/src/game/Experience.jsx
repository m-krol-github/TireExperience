import {
  Environment,
  OrbitControls,
  useTexture,
  Billboard,
  GradientTexture,
  Shadow,
  CameraControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Wheel from "./Wheel";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import Speed from "./Speed";
import Ground from "./Ground";
import { Boxes } from "./Boxes";
import { Lamps } from "./Lamps";
import { Rain } from "./Rain";
import useGame from "./stores/useGame";
import BrakeLine from "./BrakeLine";
import envMap from "../assets/textures/GlazedPatio_BW.exr";
import { Leva, useControls, button, folder } from "leva";

export default function Experience() {
  const road = useRef();
  const phase = useGame((state) => state.phase);

  // const { envMapIntensity, envRotation, envBlur } = useControls(
  //   "environment map",
  //   {
  //     envMapIntensity: { value: 1.2, min: 0, max: 5 },
  //     envRotation: { value: -2.2, min: -Math.PI, max: Math.PI },
  //     envBlur: { value: 0.8, min: 0, max: 1 },
  //   },
  //   { collapsed: true }
  // );

  // const { enabled, vec4, vec5 } = useControls(
  //   "cam controls",
  //   {
  //     vec4: {
  //       value: [19, 6, 17],
  //       label: "position",
  //       onChange: (v) => {
  //         cameraControlsRef.current?.setPosition(...v);
  //       },
  //     },
  //     vec5: {
  //       value: [0, 5, 0],
  //       label: "target",
  //       onChange: (v) => {
  //         cameraControlsRef.current?.setTarget(...v);
  //       },
  //     },
  //     enabled: { value: true, label: "controls on" },
  //   },
  //   { collapsed: true }
  // );

  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(19, 6, 17); // set the position
    camera.lookAt(new THREE.Vector3(0, 5, 0)); // set the target
    camera.fov = 45;
    camera.near = 0.1;
    camera.far = 300;
    camera.updateProjectionMatrix();
  }, []);

  return (
    <>
      <Perf position="bottom-left" />
      <Environment
        files={envMap}
        backgroundBlurriness={0.8}
        environmentIntensity={1.2}
        resolution={32}
        environmentRotation={[0, -2.2, 0]}
        backgroundRotation={[0, -2.2, 0]}
      />
      {/* <ambientLight intensity={0.1} /> */}
      <directionalLight
        castShadow
        intensity={2}
        position={[2, 8, -2]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={180}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <directionalLight intensity={1.5} position={[6, 6, 2]} />

      <Speed />
      <Wheel />
      <Ground />
      <Boxes />
      <Lamps />
      <BrakeLine lineLevel="1" />
      <BrakeLine lineLevel="2" />
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <mesh position={[0, 50, -250]}>
          <planeGeometry args={[800, 300]} />
          <meshBasicMaterial toneMapped={"false"}>
            <GradientTexture
              stops={[0.2, 0.8]} // As many stops as you want
              colors={["#123c86", "#96abb6"]} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh>
      </Billboard>
    </>
  );
}
