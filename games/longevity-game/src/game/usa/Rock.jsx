import { useGLTF } from "@react-three/drei";

import rockModel from "../../assets/objects/Usa/Rock.glb";

export function Rock({ index }) {
  const { nodes, materials } = useGLTF(rockModel);

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Rock.geometry}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.05}
    >
      <meshStandardMaterial
        color="white"
        roughness={1}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
}

useGLTF.preload(rockModel);
