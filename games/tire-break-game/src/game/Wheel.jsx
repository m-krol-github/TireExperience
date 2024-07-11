import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useGame from "./stores/useGame";
import useSpeed from "./stores/useSpeed";
import TireLow from "./TireLow";
import gsap from "gsap";

export default function Wheel(props) {
  const tire = useRef();

  const startPostion = { x: 0, y: 4.48, z: 0 };
  const startRotation = [0, (180 * Math.PI) / 180, 0];

  const currentSpeed = useRef(0);
  const currentPhase = useRef("preloading");

  useFrame((state, delta) => {
    tire.current.rotation.x -= (currentSpeed.current * delta) / 15;
  });

  function startIntroAnimation() {
    gsap.to(tire.current.position, {
      duration: 2,
      x: startPostion.x,
      y: startPostion.y,
      z: startPostion.z,
      yoyo: false,
      repeat: 0,
      ease: "bounce",
      onComplete: () => console.log("intro tween is complete"),
    });
  }

  useEffect(() => {
    startIntroAnimation();

    const unsubsribeSpeed = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        currentSpeed.current = value;
      }
    );

    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          currentPhase.current = value;
          startIntroAnimation();
          console.log(
            "!!! phase changed phase speed",
            value,
            currentPhase.current
          );
        }
      }
    );

    return () => {
      unsubsribeSpeed();
    };
  }, []);

  return (
    <group
      ref={tire}
      position={[startPostion.x, startPostion.y + 16, startPostion.z]}
      rotation={startRotation}
      scale={3.5}
    >
      <TireLow scale={4}></TireLow>
    </group>
  );
}
