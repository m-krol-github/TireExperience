import { useEffect, useRef, useState, useMemo } from "react";
import { Text, useTexture } from "@react-three/drei";
import { interopImage } from "../../helpers/interopImage";

import gateOk from "../../assets/textures/gate_ok.png";
import gateOff from "../../assets/textures/gate_off.png";
import gateWrong from "../../assets/textures/gate_wrong.png";

export function Answer(props) {
  // console.log("ANSWER " + props.linePosition);
  const lineColor = props.linePosition != -1 ? [0, 1, 1] : [0, 1, 0];
  // console.log("ANSWER ", props.linePosition, lineColor);

  const txtAnswer = props.txt; //props.obstacleType === 1 ? "good answer" : "bad answer";

  const [okTexture, offTexture, wrongTexture] = useTexture([
    interopImage(gateOk),
    interopImage(gateOff),
    interopImage(gateWrong),
  ]);

  return (
    <group visible={props.activated}>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        position={[0, 7, 2]}
      >
        {txtAnswer}
      </Text>
      <mesh position={[0, 7, 0]} scale-x={-props.linePosition}>
        <planeGeometry args={[10, 20]} />
        <meshBasicMaterial
          map={props.hit ? okTexture : offTexture}
          transparent={true}
        />
      </mesh>
    </group>
  );
}
