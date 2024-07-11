import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import TrackTrees from "../../assets/terrain/SportTrackTrees.glb";
import PineTreeBase from "../../assets/textures/pine_tree_base_color.jpg";
import TreeTop from "../../assets/textures/tree_top.jpg";
import TreeBase from "../../assets/textures/tree_base.jpg";

import { MeshStandardMaterial } from "three";
import { interopImage } from "../../helpers/interopImage";

export function SportTrackTrees(props) {
  const { nodes } = useGLTF(TrackTrees);

  const [PineTreeBaseMap] = useTexture([interopImage(PineTreeBase)]);
  const [TreeTopMap, TreeBaseMap] = useTexture([
    interopImage(TreeTop),
    interopImage(TreeBase),
  ]);

  PineTreeBaseMap.flipY = false;

  const mPineTree = useMemo(
    () =>
      new MeshStandardMaterial({
        map: PineTreeBaseMap,
        toneMapped: false,
      })
  );

  const mTreeTop = useMemo(
    () =>
      new MeshStandardMaterial({
        map: TreeTopMap,
        toneMapped: false,
      })
  );

  const mTreeBase = useMemo(
    () =>
      new MeshStandardMaterial({
        map: TreeBaseMap,
        toneMapped: false,
      })
  );

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.pCylinder51.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pSphere1.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pCylinder51001.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pSphere1001.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pCylinder51002.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pSphere1002.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pCylinder51003.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pSphere1003.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pCylinder51004.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pCylinder51007.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pCylinder51008.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pCylinder51009.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pCylinder51010.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pCylinder51011.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pSphere1004.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pSphere1007.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pSphere1008.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pSphere1009.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pSphere1010.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pSphere1011.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pCylinder51005.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pSphere1005.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pCylinder51006.geometry} material={mTreeBase} />
      <mesh geometry={nodes.pSphere1006.geometry} material={mTreeTop} />
      <mesh geometry={nodes.pasted__pCone1001.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1002.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1003.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1004.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1005.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1006.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1007.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1008.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1009.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1010.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1011.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1012.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1013.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1014.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1018.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1019.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1020.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone1021.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2001.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2002.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2003.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2004.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2005.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2006.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2007.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2008.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2009.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2010.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2011.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2012.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2013.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2014.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2018.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2019.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2020.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone2021.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3001.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3002.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3003.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3004.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3005.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3006.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3007.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3008.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3009.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3010.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3011.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3012.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3013.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3014.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3018.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3019.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3020.geometry} material={mPineTree} />
      <mesh geometry={nodes.pasted__pCone3021.geometry} material={mPineTree} />
      <mesh
        geometry={nodes.pasted__pCylinder1001.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1002.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1003.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1004.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1005.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1006.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1007.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1008.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1009.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1010.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1011.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1012.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1013.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1014.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1018.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1019.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1020.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pCylinder1021.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1001.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1002.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1003.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1004.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1005.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1006.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1007.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1008.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1009.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1010.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1011.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1012.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1013.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1014.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1018.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1019.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1020.geometry}
        material={mPineTree}
      />
      <mesh
        geometry={nodes.pasted__pPyramid1021.geometry}
        material={mPineTree}
      />
    </group>
  );
}

useGLTF.preload(TrackTrees);
useTexture.preload([PineTreeBase, TreeTop, TreeBase]);
