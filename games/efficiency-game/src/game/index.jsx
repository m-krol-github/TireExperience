"use client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import envMap from "../assets/textures/GlazedPatio_BW.exr";
import { KeyboardControls } from "@react-three/drei";

const Game = () => (
  <div className="flex h-screen relative">
    <Suspense fallback={null}>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            fov: 50,
            near: 0.1,
            far: 300,
            position: [0, 6, 40],
          }}
          dpr={1}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputColorSpace: THREE.LinearSRGBColorSpace,
          }}
        >
          <color args={[0.05, 0.16, 0.37]} attach="background" />
          {/* <fog attach="fog" color={[0.05, 0.16, 0.37]} near={180} far={200} /> */}

          <Environment
            files={envMap}
            // preset="warehouse"
            backgroundBlurriness={0.8}
            environmentIntensity={1}
            resolution={32}
            environmentRotation={[0, 2.16, 0]}
            backgroundRotation={[0, 2.16, 0]}
          />

          <Experience />

          <OrbitControls />
        </Canvas>

        <Interface />
      </KeyboardControls>
    </Suspense>
  </div>
);

export default Game;
