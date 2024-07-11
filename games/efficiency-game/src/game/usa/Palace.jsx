import { RepeatWrapping } from "three";
import { useGLTF, useTexture } from "@react-three/drei";

import { interopImage } from "../../helpers/interopImage";

import palaceModel from "../../assets/objects/Usa/Usa_Palace.glb";
import palaceBase from "../../assets/textures/Usa_Palace/Usa_Palace_MAt_BaseColor.png";
import palaceNormal from "../../assets/textures/Usa_Palace/Usa_Palace_MAt_Normal.png";

export function Palace({ index }) {
  const { nodes, materials } = useGLTF(palaceModel);

  const [base1, normal1] = useTexture([
    interopImage(palaceBase),
    interopImage(palaceNormal),
  ]);

  base1.flipY = false;
  base1.wrapS = base1.wrapT = RepeatWrapping;
  normal1.flipY = false;
  normal1.wrapS = normal1.wrapT = RepeatWrapping;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.USA_Palace.geometry}
      // material={materials.Usa_Palace_MAt}
      // position={props.position}
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
useGLTF.preload("../../assets/objects/Usa/Usa_Palace.glb");
