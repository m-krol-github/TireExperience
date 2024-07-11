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
  const setTitleToShow = useGame((state) => state.setTitleToShow);

  const questions = useQuestionData((state) => state.data);

  const distance = useRef({});
  const obs = useRef({});
  const [activated, setActivated] = useState(false);
  const [hit, _setHit] = useState(false);
  // const slotRespawnID = useSpeed((state) => state.slotRespawnID);
  //const phase = useGame((state) => state.phase);
  const phase = useRef(useGame((state) => state.phase));
  const finish = useGame((state) => state.finish);
  const startZ = -140;

  useEffect(() => {
    if (phase.current === "play") {
      console.log("Obstacle RESETING IN PLAY");
      _setHit(false);
      setActivated(false);
      obs.current.setNextKinematicTranslation({
        x: randomizedX,
        y: 1,
        z: startZ,
      });
    }
  }, [phase.current]);

  const setHit = (value) => {
    const canBeHit = onGotHitMe(keyid, slotID);
    console.log("canBeHit", canBeHit);
    if (canBeHit) {
      _setHit(value);
      console.log("Obstacle hit ", slotID);
      switch (obstacleType) {
        case 0:
          getStar();
          break;
        case 1:
          addLife();
          break;
        case -1:
          lostLife();
          break;
        case 2:
          finish();
          break;
      }
    }
  };

  const randomizedX = linePosition * 5;

  useEffect(() => {
    distance.speed = 0;
    distance.elapsed = 0;

    const unsubsribeSlotRespawn = useSpeed.subscribe(
      (state) => state.slotRespawnID,
      (value) => {
        if (value === slotID) {
          console.log(
            "speed !!!! slotRespawn activated obstacle redraw ?",
            value
          );
          setActivated(true);
          if (obstacleType == 5) {
            console.log("Question title activated");
            setTitleToShow(txt);
          }
        }
      }
    );

    return () => {
      unsubsribeSlotRespawn();
      //unsubsribeDist();
    };
  }, []);

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

    const unsubsribePhase = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        // console.log("speed changed", value);
        phase.current = value;
      }
    );

    return () => {
      unsubsribeSpeed();
      unsubsribePhase();
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
      position={[randomizedX, 0, startZ]}
      rotation={[0, 0, 0]}
      gravity={false}
      colliders={false}
    >
      {obstacleType == 0 && <Star key={1} activated={activated} hit={hit} />}

      {(obstacleType == -1 || obstacleType == 1) && (
        <Answer
          activated={activated}
          key={1}
          hit={hit}
          obstacleType={obstacleType}
          linePosition={linePosition}
          txt={txt}
        />
      )}

      {obstacleType == 2 && ( // finish line
        <FinishLine key={1} activated={activated} hit={hit} />
      )}

      {/*(obstacleType == 5 && ( // question title
        <QuestionTitle key={1} activated={activated} hit={hit} txt={txt} />
      )*/}

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
