import { useRef, useState, useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import useGame from "./stores/useGame";
import { interopImage } from "../helpers/interopImage";

import block1 from "../assets/objects/Palace_1.glb";
import block2 from "../assets/objects/Palace_2.glb";
import block3 from "../assets/objects/Palace_3.glb";
import block4 from "../assets/objects/Palace_4.glb";
import block5 from "../assets/objects/Palace_5.glb";

import newBase from "../assets/textures/Palaces/New/Palaces_Material_BaseColor_sRGB.png";
import newNormal from "../assets/textures/Palaces/New/Palaces_Material_Normal.png";
import newRoughness from "../assets/textures/Palaces/New/Palaces_Material_Roughness_Raw.png";

import wornBase from "../assets/textures/Palaces/Worn/Palaces_Material_BaseColor_sRGB.png";
import wornNormal from "../assets/textures/Palaces/Worn/Palaces_Material_Normal.png";
import wornRoughness from "../assets/textures/Palaces/Worn/Palaces_Material_Roughness_Raw.png";
import SpeedItem from "./SpeedItem";

const blockModels = [];

blockModels.push(block1);
blockModels.push(block2);
blockModels.push(block3);
blockModels.push(block4);
blockModels.push(block5);

//klasa z budynkiem
function Box({ index }) {
  const blockNo = index % blockModels.length;
  const { nodes } = useGLTF(blockModels[blockNo]);
  const box = useRef();
  const level = useGame((state) => state.level);
  const phase = useGame((state) => state.phase);

  const [base1, normal1, roughness1] = useTexture([
    interopImage(newBase),
    interopImage(newNormal),
    interopImage(newRoughness),
  ]);

  const [currentBase, setCurentBase] = useState(base1);

  base1.flipY = false;
  normal1.flipY = false;
  roughness1.flipY = false;

  const [base2, normal2, roughness2] = useTexture([
    interopImage(wornBase),
    interopImage(wornNormal),
    interopImage(wornRoughness),
  ]);

  base2.flipY = false;
  normal2.flipY = false;
  roughness2.flipY = false;

  useEffect(() => {
    alignBlocksTextureWithLevel();
  }, [phase]);

  function alignBlocksTextureWithLevel() {
    if (phase === "ready" || phase === "init") {
      console.log("aligning");
      if (level === 1) {
        if (currentBase !== base1) setCurentBase(base1);
      } else {
        if (currentBase !== base2) setCurentBase(base2);
      }
    }
  }

  return (
    <mesh
      ref={box}
      castShadow
      receiveShadow
      geometry={Object.entries(nodes)[1][1].geometry}
      // material={materials.Palace_Material}
      rotation={[Math.PI / 2, 0, 0]}
      scale={0.13}
    >
      <meshStandardMaterial
        color={0xffffff}
        map={currentBase}
        normalMap={normal1}
        roughnessMap={roughness1}
        toneMapped={false}
        transparent={true}
      />
    </mesh>
  );
}

//klasa z budynkami
export function Boxes() {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 30; i++) a.push(0);
    return a;
  });

  function getStartPosition(index, xoffset) {
    return new Vector3(-xoffset * 3 - 35, 0, index * 10 - 260);
  }

  return (
    <>
      {arr.map((e, i) => (
        <SpeedItem
          key={i}
          index={i}
          // initialPosition={getStartPosition}
          startPosition={getStartPosition(i, Math.floor(Math.random() * 5))}
          offsetZ={{ min: 40, max: -260 }}
          speedFactor={0.3}
        >
          <Box key={i} index={i} />
        </SpeedItem>
      ))}
    </>
  );
}

useGLTF.preload([block1, block2, block3, block4, block5]);
useTexture.preload([
  newBase,
  newNormal,
  newRoughness,
  wornBase,
  wornNormal,
  wornRoughness,
]);
