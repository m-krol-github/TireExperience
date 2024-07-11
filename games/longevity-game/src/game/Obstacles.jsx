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
  console.log("Obstacles MANAGER redraw");

  //const [lastHit, setLastHit] = useState(-1);
  const lastSlotUsedID = useRef(-1); // to prevent double hit of the same slot in answers

  const [rerender, setRerender] = useState(false);

  //phase=="play"? lastSlotUsedID.current = -1 : null;

  const questions = useQuestionData((state) => state.data);

  const onGotHit = (id, slotID) => {
    console.log(
      `Obstacle ${id} got hit in ${slotID} and ${lastSlotUsedID.current}!`
    );

    if (slotID != lastSlotUsedID.current) {
      lastSlotUsedID.current = slotID;
      // setLastHit(id);

      return true;
    } else {
      return false;
    }
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

  const insertGate = (slotID, questionID, map) => {
    map.push({
      linePosition: -1,
      slotID: slotID,
      obstacleType: getCorrectAnswer(questionID, 0),
      txt: getAnswer(questionID, 0),
    });
    map.push({
      linePosition: 1,
      slotID: slotID,
      obstacleType: getCorrectAnswer(questionID, 1),
      txt: getAnswer(questionID, 1),
    });
    map.push({
      linePosition: -1,
      slotID: slotID,
      obstacleType: 5,
      txt: getTitle(questionID),
    });
  };

  const obstaclesMap = useMemo(() => {
    const map = [];
    //line Position -1 left, 1 right
    //slotID where the obstacle is placed
    //obstacleType 0 - star, 1 - good answer, -1 - bad answer ,2 - finish line, 5 - question title

    //console.log("!@# Questions in Obstacles", questions.questions)
    insertGate(1, 0, map);

    for (let i = 16; i < 49; i += 4) {
      map.push({
        linePosition: Math.random() < 0.5 ? -1 : 1,
        slotID: i,
        obstacleType: 0,
      });
    }

    insertGate(60, 1, map);
    for (let i = 80; i < 105; i += 3) {
      map.push({
        linePosition: Math.random() < 0.5 ? -1 : 1,
        slotID: i,
        obstacleType: 0,
      });
    }

    insertGate(120, 2, map);

    for (let i = 135; i < 165; i += 2) {
      map.push({
        linePosition: Math.random() < 0.5 ? -1 : 1,
        slotID: i,
        obstacleType: 0,
      });

      insertGate(185, 3, map);
    }

    map.push({ linePosition: 1, slotID: 200, obstacleType: 2 });

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
