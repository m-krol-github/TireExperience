import React, { useMemo } from "react";

import { MeshReflectorMaterial, useTexture, useGLTF } from "@react-three/drei";
import { RepeatWrapping } from "three";

import baseSidewalk from "../../assets/textures/Sidewalk/Sidewalk_1_BaseColor.png";
import roughnessSidewalk from "../../assets/textures/Sidewalk/Sidewalk_1_Roughness.png";
import normalSidewalk from "../../assets/textures/Sidewalk/Sidewalk_1_Normal.png";

import { interopImage } from "../../helpers/interopImage";

//obsługa terenu, odbicia, tekstury
export default function SideMaterial() {
  const [baseSide, normalSide, roughnessSide] = useTexture([
    interopImage(baseSidewalk),
    interopImage(roughnessSidewalk),
    interopImage(normalSidewalk),
  ]);

  baseSide.wrapS = baseSide.wrapT = RepeatWrapping;
  baseSide.repeat.set(1, 6);
  normalSide.wrapS = normalSide.wrapT = RepeatWrapping;
  normalSide.repeat.set(1, 6);
  roughnessSide.wrapS = roughnessSide.wrapT = RepeatWrapping;
  roughnessSide.repeat.set(1, 6);

  const reflectorMaterial = useMemo(() => {
    return (
      <MeshReflectorMaterial
        mixBlur={5}
        blur={[180, 180 * 2]}
        resolution={1024}
        mixStrength={3}
        mirror={0}
        color={"#666666"}
        map={baseSide}
        // normalMap={normalSide}
        roughnessMap={roughnessSide}
        roughness={1}
        depthScale={0.5}
        dithering={true}
        minDepthThreshold={0.2}
        maxDepthThreshold={0.6}
        depthToBlurRatioBias={0.25}
        metalness={0}
        toneMapped={false}
      />
    );
  }, []);

  return reflectorMaterial;
}

useTexture.preload([baseSidewalk, normalSidewalk, roughnessSidewalk]);
