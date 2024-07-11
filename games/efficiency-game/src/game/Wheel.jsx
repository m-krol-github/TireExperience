import { useGLTF } from "@react-three/drei";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useGame from "./stores/useGame";
import useSpeed from "./stores/useSpeed";
import useControll from "./stores/useControll";

import TireLow from "./TireLow";

import gsap from "gsap";

import { CylinderCollider, RigidBody } from "@react-three/rapier";

export default function Wheel(props) {
  const phase = useGame((state) => state.phase);

  const ggg = useRef();
  const wCollider = useRef();

  const rb = useRef();

  const startPostion = { x: -6, y: 5, z: 0 };
  const startRotation = [0, Math.PI, 0];

  const currentSpeed = useRef(0);

  const handleSteer = (state) => {
    console.log("rig handleSTEER  " + state);
    rb.current.applyImpulse({ x: 25000 * state, y: 0, z: 0 }, true);
  };

  useFrame((state, delta) => {
    ggg.current.rotation.x -= (currentSpeed.current * delta) / 30;
    //console.log("wheel position", wCollider.current);
  });

  useEffect(() => {
    gsap.to(ggg.current.position, {
      duration: 2,
      x: startPostion.x,
      y: startPostion.y,
      z: startPostion.z,
      yoyo: false,
      repeat: 0,
      ease: "bounce",
      onComplete: () => console.log("the tween is complete"),
    });

    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        console.log("!!! phase changed", value);
        /* if (value === "readyToStart")   {
          gsap.to(ggg.current.position, {
            duration: 2,
            x: startPostion.x,
            y: startPostion.y,
            z: startPostion.z,
            yoyo: false,
            repeat: 0,
            ease: "bounce",
            onComplete: () => console.log("the tween is complete"),
          });
        } else*/
        if (value === "play") {
          console.log("!!! speedingUp");
          /*gsap.to(ggg.current.rotation, {
            duration: 0.5,
            x: 0,
            y: Math.PI,
            z: 0,
            yoyo: false,
            repeat: 0,
            ease: "bounce",
            onComplete: () => console.log("the tween is complete"),
          });*/
        } else if (value === "ended") {
          console.log("!!! ended");
        }
      }
    );

    const unsubsribeSpeed = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        currentSpeed.current = value;
      }
    );

    const unsubsribeControll = useControll.subscribe(
      (state) => state.position,
      (value) => {
        handleSteer(value);
      }
    );

    return () => {
      unsubsribePhase();
      unsubsribeSpeed();
      unsubsribeControll();
    };
  }, []);

  return (
    <RigidBody
      key={666}
      linearDamping={5}
      mass={20}
      gravityScale={0}
      ref={rb}
      colliders={false}
      name="wheel"
      onCollisionEnter={({ manifold, target, other }) => {
        console.log(
          "Collision at world position ",
          manifold.solverContactPoint(0)
        );

        if (other.rigidBodyObject) {
          console.log(
            // this rigid body's Object3D
            target.rigidBodyObject.name,
            " collided with ",
            // the other rigid body's Object3D
            other.rigidBodyObject.name
          );
        }
      }}
    >
      <CylinderCollider
        args={[2, 5.5, 5.5]}
        position={[-6, 5, 0]}
        ref={wCollider}
        rotation={[(-90 * Math.PI) / 180, 0, (90 * Math.PI) / 180]}
      />

      <group
        ref={ggg}
        position={[startPostion.x, startPostion.y + 16, startPostion.z]}
        rotation={startRotation}
        scale={4}
      >
        <TireLow scale={4}></TireLow>
        {/*
          <mesh position={[-0.8, 0, 0]} onClick={() => handleSteer(-1)}>
          <boxGeometry args={[0.5, 0.3, 0.3]} />
          <meshBasicMaterial transparent opacity={1} />
        </mesh>

         Clickable invisible box on the right 
        <mesh position={[0.8, 0, 0]} onClick={() => handleSteer(1)}>
          <boxGeometry args={[0.5, 0.3, 0.3]} />
          <meshBasicMaterial transparent opacity={1} />
        </mesh>*/}
      </group>
    </RigidBody>
  );
}
