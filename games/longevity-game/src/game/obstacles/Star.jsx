import { useGLTF } from "@react-three/drei";
import star from "../../assets/objects/Michelin_Star.glb";

export function Star(props) {
  console.log("STAR");
  const { nodes, materials } = useGLTF(star);

  return (
    <mesh
      castShadow
      geometry={nodes.Michelin_Star.geometry}
      // material={materials.Michelin_Star_Mat}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.1}
      visible={props.activated}
    >
      <meshStandardMaterial
        color={props.hit ? [0, 0, 1] : [1, 0, 0]}
        transparent={false}
      />
    </mesh>
  );
}
useGLTF.preload(star);
