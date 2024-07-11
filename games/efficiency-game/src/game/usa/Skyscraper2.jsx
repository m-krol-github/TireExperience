import { RepeatWrapping } from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { interopImage } from "../../helpers/interopImage";

import skyscraperModel from "../../assets/objects/Usa/Skyscraper_2.glb";
import skyscraperBase from "../../assets/textures/Skyscrapers/Skyscrapers_BaseColor.png";
import skyscraperNormal from "../../assets/textures/Skyscrapers/Skyscrapers_Normal.png";

export function Skyscraper2({ index }) {
  const { nodes, materials } = useGLTF(skyscraperModel);

  const [base1, normal1] = useTexture([
    interopImage(skyscraperBase),
    interopImage(skyscraperNormal),
  ]);

  base1.flipY = false;
  base1.wrapS = base1.wrapT = RepeatWrapping;
  normal1.flipY = false;
  normal1.wrapS = normal1.wrapT = RepeatWrapping;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Skyscraper_2.geometry}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}
      scale={0.05}
    >
      <meshStandardMaterial
        map={base1}
        roughness={1}
        normalMap={normal1}
        normalScale={0.1}
        toneMapped={false}
      />
    </mesh>
  );
}
useGLTF.preload("../../assets/objects/Usa/Skyscraper_2.glb");
