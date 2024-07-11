import {
  Billboard,
  Environment,
  GradientTexture,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import TirePath from "./TirePath";
import GhostTirePath from "./GhostTirePath";
import FlowController from "./FlowController";
import { useControls } from "leva";
import { WinterComplete } from "./WinterComplete";
import Speed from "./Speed";

import envMap from "../assets/textures/GlazedPatio_BW.exr";
import { YellowZones } from "./YellowZones";
//import { YellowZone } from "./YellowZone";

export default function Experience() {
  const { envMapIntensity, envRotation, ambientIntensity } = useControls(
    "environment light",
    {
      envMapIntensity: { value: 0.4, min: 0, max: 5 },
      envRotation: { value: -3.1, min: -Math.PI, max: Math.PI },
      ambientIntensity: { value: 1.15, min: 0, max: 5 },
    },
    { collapsed: true }
  );

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      {/* CAMERA & LIGHTS */}
      <ambientLight intensity={ambientIntensity} color={[0.9, 0.9, 1]} />
      <Environment
        files={envMap}
        backgroundBlurriness={0.8}
        environmentIntensity={envMapIntensity}
        resolution={32}
        environmentRotation={[0, envRotation, 0]}
        backgroundRotation={[0, envRotation, 0]}
      />
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <mesh position={[0, 50, -620]}>
          <planeGeometry args={[3000, 800]} />
          <meshBasicMaterial>
            <GradientTexture
              stops={[0.2, 0.6]} // As many stops as you want
              colors={["#012567", "#fffbda"]} // Colors need to match the number of stops
              size={1024} // Size is optional, default = 1024
            />
          </meshBasicMaterial>
        </mesh>
      </Billboard>

      <TirePath />
      <GhostTirePath />

      {/* offset od 0 do 1 */}
      {/*<YellowZone position={[20, 40.3, 50]} offset={0} />*/}
      <YellowZones position={[20, 40.3, 50]} />
      <FlowController />
      <WinterComplete />
      <Speed />
    </>
  );
}
