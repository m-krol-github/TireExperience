"use client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Preloader } from "./Preloader";

const Game = () => (
  <div className="flex h-screen relative">
    <KeyboardControls map={[{ name: "brake", keys: ["Space"] }]}>
      <Canvas
        shadows
        dpr={1}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.LinearSRGBColorSpace,
        }}
      >
        <Suspense fallback={<Preloader />}>
          <color args={[0.05, 0.16, 0.37]} attach="background" />
          {/* <fog attach="fog" color={[0.05, 0.16, 0.37]} near={80} far={140} /> */}

          <Experience />
        </Suspense>

        {/* <OrbitControls target={[0, 5, 0]} enabled={false} /> */}
      </Canvas>

      <Interface />
    </KeyboardControls>
  </div>
);

export default Game;
