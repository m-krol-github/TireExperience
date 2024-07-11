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
import { Preloader } from "./Preloader.jsx";

const Game = () => (
  <div className="flex h-screen relative">
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
        }}
        dpr={1}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.LinearSRGBColorSpace,
        }}
      >
        <color args={[0.07, 0.23, 0.52]} attach="background" />
        <Suspense fallback={<Preloader />}>
          <Experience />
        </Suspense>
      </Canvas>
      <Interface />
    </KeyboardControls>
  </div>
);

export default Game;
