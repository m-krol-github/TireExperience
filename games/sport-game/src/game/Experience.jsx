import {
  Billboard,
  Environment,
  GradientTexture,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import FlowController from "./FlowController";
import { useControls } from "leva";
import Wheel from "./Wheel";
import SportGround from "./environment/SportGround";
import SportBuildings from "./environment/SportBuildings";
import SportRoad from "./environment/SportRoad";
import SportTrackElements from "./environment/SportTrackElements";
import SportTrackLights from "./environment/SportTrackLights";
import { SportTrackTrees } from "./environment/SportTrackTrees";

import Speed from "./Speed";

import envMap from "../assets/textures/schadowplatz.exr";
import TirePathMaciek from "./TirePathMaciek";

export default function Experience() {
  const zWorldPosition = -1;
  const yWorldPosition = 1;
  const xWorldPosition = 2.5;

  const {
    envMapIntensity,
    envRotation,
    ambientIntensity,
    directionalIntensity,
  } = useControls(
    "environment light",
    {
      envMapIntensity: { value: 0.2, min: 0, max: 5 },
      envRotation: { value: 0.8, min: -Math.PI, max: Math.PI },
      ambientIntensity: { value: 0.8, min: 0, max: 5 },
      directionalIntensity: { value: 1.2, min: 0, max: 5 },
    },
    { collapsed: true }
  );

  return (
    <>
      <Perf position="top-left" />
      {/*<OrbitControls />*/}
      {/* CAMERA & LIGHTS */}
      <ambientLight intensity={ambientIntensity} />
      <Environment
        files={envMap}
        backgroundBlurriness={0.8}
        environmentIntensity={envMapIntensity}
        resolution={32}
        environmentRotation={[0, envRotation, 0]}
        backgroundRotation={[0, envRotation, 0]}
      />
      <directionalLight
        castShadow
        intensity={directionalIntensity}
        position={[-2, 10, 0]}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={50}
        shadow-camera-right={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
      />
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <mesh position={[0, 50, -620]}>
          <planeGeometry args={[3000, 1500]} />
          <meshBasicMaterial>
            <GradientTexture
              stops={[0.25, 0.5, 0.7]} // As many stops as you want
              colors={["#003AA4", "#FFF9C2", "#FEFEFE"]} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh>
      </Billboard>
      {/* Track Components */}
      {/*<SportTire />*/}
      <Speed />
      <TirePathMaciek />
      <SportTrackTrees position={[xWorldPosition, yWorldPosition, zWorldPosition]} />
      <SportTrackLights position={[xWorldPosition, yWorldPosition, zWorldPosition]} />
      <SportTrackElements position={[xWorldPosition, yWorldPosition, zWorldPosition]} />
      <SportRoad position={[xWorldPosition, yWorldPosition, zWorldPosition]} />
      <SportBuildings position={[xWorldPosition, yWorldPosition, zWorldPosition]} />
      <SportGround position={[xWorldPosition, yWorldPosition, zWorldPosition]} />
      <FlowController />
    </>
  );
}
