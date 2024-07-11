"use client";
import { Canvas } from "@react-three/fiber";
import { useBearStore } from "@tire-test/zustand-store";
import { Box } from "./Box/Box";
/* eslint-disable-next-line */
export interface ExampleGameProps {}

export function ExampleGame(props: ExampleGameProps) {
  const { bears, increase } = useBearStore();

  return (
    <div className="text-center">
      <h1>Welcome to ExampleGame!</h1>
      <div>{bears}</div>
      <button onClick={() => increase(1)} className="bg-blue-400 p-2">
        More bears
      </button>

      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default ExampleGame;
