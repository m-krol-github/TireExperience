import { RepeatWrapping } from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { interopImage } from "../../helpers/interopImage";

import restaurantModel from "../../assets/objects/Resturant.glb";
import restaurantBase from "../../assets/textures/Resturant/Resturant_Mat_BaseColor.png";

export function Restaurant({ index }) {
  const { nodes, materials } = useGLTF(restaurantModel);

  const [base1] = useTexture([interopImage(restaurantBase)]);

  base1.flipY = false;
  base1.wrapS = base1.wrapT = RepeatWrapping;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Restorant.geometry}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}
      scale={0.06}
    >
      <meshStandardMaterial
        map={base1}
        roughness={1}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
}
useGLTF.preload(restaurantModel);
useTexture.preload([restaurantBase]);
