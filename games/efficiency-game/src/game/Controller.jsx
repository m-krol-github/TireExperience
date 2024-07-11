import { useKeyboardControls } from "@react-three/drei";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import useGame from "./stores/useGame";
import useSpeed from "./stores/useSpeed";
import useControll from "./stores/useControll";

import TireLow from "./TireLow";

import gsap from "gsap";

import {
  CylinderCollider,
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";

export default function Controller(props) {
  const phase = useGame((state) => state.phase);
  const [subscribeKeys] = useKeyboardControls();

  const leftKeyID = 1001;
  const rightKeyID = 1002;

  const lSide = useRef();
  const rSide = useRef();

  const sideState = useRef(-1);

  const setReady = useControll((state) => state.setReady);
  const gotoPosition = useControll((state) => state.gotoPosition);

  useEffect(() => {
    const unsubscribeLeft = subscribeKeys(
      (state) => state.leftward,
      (value) => {
        handleSteer(-1);
      }
    );

    const unsubscribeRight = subscribeKeys(
      (state) => state.rightward,
      (value) => {
        handleSteer(1);
      }
    );

    return () => {
      unsubscribeLeft();
      unsubscribeRight();
    };
  }, []);

  //const leftward = useKeyboardControls((state) => state.leftward)
  //const rightward = useKeyboardControls((state) => state.rightward)

  // console.log("LEFTWARD " + leftward + " RIGHTWARD " + rightward);
  /*()
  useEffect(() =>
  {
      const unsubscribeJump = subscribeKeys(
          // ...
      )

      subscribeKeys(
          () =>
          {
              console.log('any key down')
          }
      )

      // ...
  }, [])*/

  const handleSteer = (state) => {
    console.log("!rig handleSTEER  " + state);
    //rb.current.applyImpulse({ x: -25000 * state, y: 0, z: 0 }, true);
    gotoPosition(state);
  };

  const setSide = (state) => {
    console.log("setSide  " + state);
    sideState.current = state;
    setReady(true);
  };

  return (
    <group>
      <RigidBody
        ref={lSide}
        type="kinematicPosition"
        name={"side_" + leftKeyID}
        key={leftKeyID}
        position={[-8.2, 0, 0]}
        rotation={[0, 0, 0]}
        gravity={false}
        colliders={false}
      >
        <CuboidCollider
          args={[1, 3, 5]}
          sensor
          onIntersectionEnter={() => {
            console.log("LEFT REACH !");
            setSide(-1);
          }}
        ></CuboidCollider>
      </RigidBody>

      <RigidBody
        ref={rSide}
        type="kinematicPosition"
        name={"side_" + rightKeyID}
        key={rightKeyID}
        position={[8.2, 0, 0]}
        rotation={[0, 0, 0]}
        gravity={false}
        colliders={false}
      >
        <CuboidCollider
          args={[1, 3, 5]}
          sensor
          onIntersectionEnter={() => {
            console.log("RIGHT REACH !");
            setSide(1);
          }}
        ></CuboidCollider>
      </RigidBody>

      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[-7, -2, -5]}
        onClick={() => handleSteer(-1)}
      >
        <boxGeometry args={[13, 32, 2]} />
        <meshBasicMaterial color={[1, 1, 1]} transparent={false} />
      </mesh>

      <mesh
        rotation-x={-Math.PI * 0.5}
        position={[7, -2, -5]}
        onClick={() => handleSteer(1)}
      >
        <boxGeometry args={[13, 32, 2]} />
        <meshBasicMaterial color={[1, 1, 1]} transparent={false} />
      </mesh>
    </group>
  );
}
