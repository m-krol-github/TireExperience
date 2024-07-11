import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useGame from "./stores/useGame";
import useTime from "./stores/useTime";
import { WinterTire } from "./WinterTire";

export default function WheelGhost() {
  const tire = useRef();

  const startPostion = { x: 0, y: 0, z: 0 };
  const startRotation = [0, 0, 0];

  const currentSpeed = useRef(0);
  const currentDistance = useRef(0);

  useFrame(() => {
    tire.current.rotation.x = currentDistance.current * 100;
  });

  useEffect(() => {
    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ended") {
          console.log("!!! ended");
        }
      }
    );

    const unsubsribeSpeed = useTime.subscribe(
      (state) => state.speed,
      (value) => {
        currentSpeed.current = value;
      }
    );

    const unsubsribeDistance = useTime.subscribe(
      (state) => state.distance,
      (value) => {
        currentDistance.current = value;
      }
    );

    return () => {
      unsubsribePhase();
      unsubsribeSpeed();
      unsubsribeDistance();
    };
  }, []);

  return (
    <group
      ref={tire}
      position={[startPostion.x, startPostion.y + 1, startPostion.z]}
      rotation={startRotation}
      scale={1}
    >
      <WinterTire />
    </group>
  );
}
