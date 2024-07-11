import { useEffect, useRef, useState, useMemo } from "react";
import { Text } from "@react-three/drei";

export function QuestionTitle(props) {
  //console.log("QUESTION " + props.txt);

  // console.log("ANSWER ", props.linePosition, lineColor);

  const txt = "QUESTION " + props.txt;
  return (
    <group visible={props.activated}>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        position={[4, 14, 2]}
      >
        {txt}
      </Text>
    </group>
  );
}
