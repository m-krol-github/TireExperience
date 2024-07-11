import { RepeatWrapping } from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { interopImage } from "../../helpers/interopImage";

import statueModel from "../../assets/objects/Usa/Liberty_Statue.glb";
import statueBase from "../../assets/textures/Statue_Liberty/Liberty_Statue_Mat_BaseColor.png";
import statueNormal from "../../assets/textures/Statue_Liberty/Liberty_Statue_Mat_Normal.png";

export function Statue() {
  const { nodes, materials } = useGLTF(statueModel);

  const [base1, normal1] = useTexture([
    interopImage(statueBase),
    interopImage(statueNormal),
  ]);

  base1.flipY = false;
  base1.wrapS = base1.wrapT = RepeatWrapping;
  normal1.flipY = false;
  normal1.wrapS = normal1.wrapT = RepeatWrapping;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Liberty_Statue.geometry}
      // material={materials.Liberty_Statue_Mat}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.13}
    >
      <meshStandardMaterial
        map={base1}
        roughness={1}
        normalMap={normal1}
        normalScale={0.2}
        toneMapped={false}
      />
    </mesh>
  );
}

useGLTF.preload(statueModel);
useTexture.preload([statueBase, statueNormal]);
