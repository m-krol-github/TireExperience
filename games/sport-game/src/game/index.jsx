"use client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";
import * as THREE from "three";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";

const Game = () => (
  <div className="flex h-screen relative">
    <KeyboardControls
      map={[
        { name: "leftward", keys: ["ArrowLeft"] },
        { name: "rightward", keys: ["ArrowRight"] },
      ]}
    >
      <Canvas
        shadows
        dpr={1}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.LinearSRGBColorSpace,
        }}
      >
        <color args={[0.003, 0.145, 0.403]} attach="background" />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>

      <Interface />
    </KeyboardControls>
  </div>
);

export default Game;
