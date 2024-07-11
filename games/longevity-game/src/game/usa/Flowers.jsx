import { useGLTF } from "@react-three/drei";

import flowersModel from "../../assets/objects/Usa/Flowerbed_Complete.glb";

export function Flowers({ index }) {
  const { nodes, materials } = useGLTF(flowersModel);

  return (
    <group rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.05}>
      <mesh castShadow receiveShadow geometry={nodes.Mesh.geometry}>
        <meshStandardMaterial
          color="white"
          roughness={1}
          toneMapped={false}
          transparent
        />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Mesh_1.geometry}>
        <meshStandardMaterial
          color="#FFFF0A"
          roughness={1}
          toneMapped={false}
          transparent
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(flowersModel);
