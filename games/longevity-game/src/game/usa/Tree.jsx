import React, { useState } from "react";

import { RepeatWrapping } from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { interopImage } from "../../helpers/interopImage";

import model from "../../assets/objects/Usa/Usa_Tree.glb";
import treeBase from "../../assets/textures/Trees/Usa_tree_BaseColor.png";

export function Tree({ index }) {
  const { nodes } = useGLTF(model);

  const [treeRotation] = useState(() => {
    return [Math.PI / 2, 0, Math.random() * Math.PI * 2];
  });

  const [base1] = useTexture([interopImage(treeBase)]);

  base1.flipY = false;
  base1.wrapS = base1.wrapT = RepeatWrapping;

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.USA_Tree.geometry}
      rotation={treeRotation}
      scale={0.05}
    >
      <meshStandardMaterial
        map={base1}
        roughness={1}
        toneMapped={false}
        transparent
      />
    </mesh>
  );
}

useGLTF.preload(model);
useTexture.preload([treeBase]);
