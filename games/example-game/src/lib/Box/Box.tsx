import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useBearStore } from "@tire-test/zustand-store";
import { Mesh } from "three";

export function Box(props: any) {
  const { bears } = useBearStore();
  const scale = Math.max(1, bears) * 0.25;

  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.x += delta;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? scale * 1.5 : scale}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
