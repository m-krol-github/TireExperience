"use client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";
import { Environment, ScrollControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import envMap from "../assets/textures/GlazedPatio_BW.exr";
import { KeyboardControls } from "@react-three/drei";

const Game = () => (
  <div className="flex h-screen relative">
    <KeyboardControls map={[{ name: "grip", keys: ["Space"] }]}>
      <Canvas
        shadows
        dpr={1}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.LinearSRGBColorSpace,
        }}
      >
        <color args={[0.05, 0.16, 0.37]} attach="background" />
        {/* <fog attach="fog" color={[0.05, 0.14, 0.7]} near={100} far={250} /> */}

        <Environment
          files={envMap}
          backgroundBlurriness={0.8}
          environmentIntensity={1}
          resolution={32}
          environmentRotation={[0, 2.16, 0]}
          backgroundRotation={[0, 2.16, 0]}
        />

        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>

      <Interface />
    </KeyboardControls>
  </div>
);

export default Game;
