import { useEffect, useRef, useState, useMemo } from "react";
import { Text, useTexture, useFont, Text3D } from "@react-three/drei";
import { interopImage } from "../../helpers/interopImage";

import gateOk from "../../assets/textures/gate_ok.png";
import gateOff from "../../assets/textures/gate_off.png";
import gateWrong from "../../assets/textures/gate_wrong.png";
import michelinBlackFont from "../../assets/font/MichelinBlackReverse.json";

export function Answer(props) {
  // console.log("ANSWER " + props.linePosition);
  const lineColor = props.linePosition != -1 ? [0, 1, 1] : [0, 1, 0];
  // console.log("ANSWER ", props.linePosition, lineColor);

  const txtAnswer = props.txt; //props.obstacleType === 1 ? "good answer" : "bad answer";

  const [hitGoodTexture, hitWrongTexture, offTexture] = useTexture([
    interopImage(gateOk),
    interopImage(gateWrong),
    interopImage(gateOff),
  ]);

  const [aTexture, setHitTexture] = useState(offTexture);

  if (props.hit && props.obstacleType === 1) {
    setHitTexture(hitGoodTexture);
  } else if (props.hit && props.obstacleType === -1) {
    setHitTexture(hitWrongTexture);
  }
  // const michelinBlack = useFont(michelinBlackFont);

  return (
    <group visible={props.activated}>
      <mesh position={[0, 7, 0]} scale-x={-props.linePosition}>
        <planeGeometry args={[10, 20]} />
        <meshBasicMaterial
          map={aTexture}
          transparent={true}
          toneMapped={false}
        />
      </mesh>

      <Text3D
        font={michelinBlackFont}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        maxWidth={10}
        scale={0.7}
        position={[-3, 7, 2]}
      >
        {txtAnswer}
      </Text3D>
    </group>
  );
}

useTexture.preload([
  interopImage(gateOk),
  interopImage(gateOff),
  interopImage(gateWrong),
]);
//useFont.preload(michelinBlackFont);
