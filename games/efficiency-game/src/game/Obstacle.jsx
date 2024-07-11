import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import useSpeed from "./stores/useSpeed";
import { RigidBody } from "@react-three/rapier";
import { CuboidCollider } from "@react-three/rapier";
import useGame from "./stores/useGame";
import { Text } from "@react-three/drei";
import { Star } from "./obstacles/Star";
import { Answer } from "./obstacles/Answer";
import { FinishLine } from "./obstacles/FinishLine";
import useQuestionData from "./stores/useQuestionData";
import { QuestionTitle } from "./obstacles/QuestionTitle";

export function Obstacle(props) {
  const {
    keyid,
    onGotHitMe,
    linePosition,
    slotID,
    obstacleType = 0,
    txt = "",
  } = props;

  const speedDivider = 200;
  const getStar = useGame((state) => state.getStar);
  const lostLife = useGame((state) => state.lostLife);
  const addLife = useGame((state) => state.addLife);

  const questions = useQuestionData((state) => state.data);

  const distance = useRef({});
  const obs = useRef({});
  const [activated, setActivated] = useState(false);
  const [hit, _setHit] = useState(false);
  const slotRespawnID = useSpeed((state) => state.slotRespawnID);
  const phase = useGame((state) => state.phase);
  const finish = useGame((state) => state.finish);
  const startZ = -120;

  useEffect(() => {
    if (phase === "play") {
      setActivated(false);
      _setHit(false);
      obs.current.setNextKinematicTranslation({
        x: randomizedX,
        y: 1,
        z: startZ,
      });
    }
  }, [phase]);

  const setHit = (value) => {
    _setHit(value);
    console.log("Obstacle hit", onGotHitMe);
    switch (obstacleType) {
      case 0:
        getStar();
        break;
      case 1:
        addLife();
        break;
      case -1:
        lostLife(); // to do sprawdzic zeby nie trafić dwóch na raz good i bad
        break;
      case 2:
        finish();
        break;
    }

    onGotHitMe(keyid);
  };

  const randomizedX = linePosition * 5;

  useEffect(() => {
    if (slotRespawnID === slotID) {
      setActivated(true);
      console.log("!!!! slotRespawn activated obstacle", slotID);
    }
  }, [slotRespawnID]);

  useEffect(() => {
    distance.speed = 0;
    distance.elapsed = 0;

    const unsubsribeSpeed = useSpeed.subscribe(
      (state) => state.speed,
      (value) => {
        // console.log("speed changed", value);
        distance.speed = value;
      }
    );

    return () => {
      unsubsribeSpeed();
      //unsubsribeDist();
    };
  }, []);

  useFrame((state, delta) => {
    if (activated)
      obs.current.setNextKinematicTranslation({
        x: randomizedX,
        y: 1,
        z: obs.current.translation().z + distance.speed / speedDivider,
      });
  });

  return (
    <RigidBody
      ref={obs}
      type="kinematicPosition"
      name={"obstacle_" + keyid}
      key={keyid}
      position={[randomizedX, 0, -50]}
      rotation={[0, 0, 0]}
      gravity={false}
      colliders={false}
    >
      {obstacleType == 0 && <Star activated={activated} hit={hit} />}

      {(obstacleType == -1 || obstacleType == 1) && (
        <Answer
          activated={activated}
          hit={hit}
          obstacleType={obstacleType}
          linePosition={linePosition}
          txt={txt}
        />
      )}

      {obstacleType == 2 && ( // finish line
        <FinishLine activated={activated} hit={hit} />
      )}

      {obstacleType == 5 && ( // question title
        <QuestionTitle activated={activated} hit={hit} txt={txt} />
      )}

      {obstacleType < 5 && (
        <CuboidCollider
          args={obstacleType != 2 ? [5, 4, 1] : [20, 4, 0.5]}
          sensor
          onIntersectionEnter={() => {
            console.log("Goal!");
            setHit(true);
          }}
        ></CuboidCollider>
      )}
    </RigidBody>
  );
}
