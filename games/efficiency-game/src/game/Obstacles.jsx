import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { RepeatWrapping, TextureLoader } from "three";
import useSpeed from "./stores/useSpeed";
import useGame from "./stores/useGame";
import { RigidBody } from "@react-three/rapier";
import { CuboidCollider } from "@react-three/rapier";
import { Obstacle } from "./Obstacle";
import useQuestionData from "./stores/useQuestionData";

export function Obstacles(props) {
  //console.log("Obstacles MANAGER");

  const [lastHit, setLastHit] = useState(-1);

  const [rerender, setRerender] = useState(false);

  const phase = useGame((state) => state.phase);

  const questions = useQuestionData((state) => state.data);

  const onGotHit = (id) => {
    console.log(`Obstacle ${id} got hit!`);
    setLastHit(id);
  };

  //todo przenieść do QuestionData ?

  const getAnswer = (qID, aID) => {
    return questions.questions[qID].answers[aID];
  };

  const getTitle = (qID) => {
    let title = questions.questions[qID].title;
    // console.log("question Title ", title);
    return title;
  };
  const getCorrectAnswer = (qID, aID) => {
    if (questions.questions[qID].correct == aID) {
      //console.log("Correct Answer ", qID, aID, questions.questions[qID].correct)
      return 1;
    } else {
      //console.log("Wrong Answer ", qID, aID)
      return -1;
    }
  };

  const obstaclesMap = useMemo(() => {
    console.log("useMemo phase " + phase);

    const map = [];
    //line Position -1 left, 1 right
    //slotID where the obstacle is placed
    //obstacleType 0 - star, 1 - good answer, -1 - bad answer ,2 - finish line, 5 - question title

    //console.log("!@# Questions in Obstacles", questions.questions)
    map.push({
      linePosition: -1,
      slotID: 2,
      obstacleType: getCorrectAnswer(0, 0),
      txt: getAnswer(0, 0),
    });
    map.push({
      linePosition: 1,
      slotID: 2,
      obstacleType: getCorrectAnswer(0, 1),
      txt: getAnswer(0, 1),
    });
    map.push({
      linePosition: -1,
      slotID: 2,
      obstacleType: 5,
      txt: getTitle(0),
    });

    map.push({ linePosition: 1, slotID: 3, obstacleType: 0 });

    map.push({
      linePosition: -1,
      slotID: 4,
      obstacleType: getCorrectAnswer(1, 0),
      txt: getAnswer(1, 0),
    });
    map.push({
      linePosition: 1,
      slotID: 4,
      obstacleType: getCorrectAnswer(1, 1),
      txt: getAnswer(1, 1),
    });
    map.push({
      linePosition: -1,
      slotID: 4,
      obstacleType: 5,
      txt: getTitle(1),
    });

    map.push({ linePosition: 1, slotID: 5, obstacleType: 2 });

    map.push({ linePosition: 1, slotID: 6, obstacleType: 0 });
    map.push({ linePosition: -1, slotID: 7, obstacleType: 0 });
    map.push({ linePosition: -1, slotID: 8, obstacleType: 0 });
    map.push({ linePosition: -1, slotID: 9, obstacleType: 0 });
    map.push({ linePosition: 1, slotID: 10, obstacleType: 0 });
    map.push({ linePosition: 1, slotID: 12, obstacleType: 0 });
    map.push({ linePosition: -1, slotID: 13, obstacleType: 0 });
    map.push({ linePosition: 1, slotID: 14, obstacleType: 0 });
    map.push({ linePosition: -1, slotID: 15, obstacleType: 0 });
    map.push({ linePosition: 1, slotID: 16, obstacleType: 0 });
    map.push({ linePosition: -1, slotID: 17, obstacleType: 0 });
    map.push({ linePosition: -1, slotID: 18, obstacleType: 2 });

    return map;
  }, [questions]);

  const obstacleListRef = useRef([]);

  useEffect(() => {
    //console.log("INIT Obstacles map " + obstaclesMap.length, );
    for (let i = 0; i < obstaclesMap.length; i++) {
      //console.log("Obstacle question ? " + obstaclesMap[i].txt);
      obstacleListRef.current.push(
        <Obstacle
          keyid={i}
          key={i}
          hit={false}
          linePosition={obstaclesMap[i].linePosition}
          slotID={obstaclesMap[i].slotID}
          obstacleType={obstaclesMap[i].obstacleType}
          txt={obstaclesMap[i].txt}
          onGotHitMe={onGotHit}
        />
      );
    }

    setRerender(!rerender);

    console.log("!!! updateObstacles use effect");
  }, [questions]);

  /*useEffect(() => {
    const timer = setTimeout(() => {
      delete obstacleListRef.current[lastHit];
      setRerender(!rerender);
      console.log("!!! 2 updateObstacles use effect");
    }, 1000); // Set the timer duration in milliseconds (e.g., 1000ms = 1 second)

    return () => clearTimeout(timer); // Clear the timer when the component unmounts or when the dependency changes
  }, [lastHit]);
  return <>{obstacleListRef.current.filter((obstacle) => !obstacle.hit)}</>;
  */

  return <>{obstacleListRef.current}</>;
}
