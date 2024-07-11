import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { MeshMatcapMaterial } from "three";
import crossclimateHigh from "../assets/Crossclimate/High/Crossclimate_High.glb";
import crossclimatePatternMatA0 from "../assets/Crossclimate/High/Texture/Tire_Pattern_Mat_AO.png";
import crossclimatePatternMatNormal from "../assets/Crossclimate/High/Texture/Tire_Pattern_Mat_Normal.png";
import tireMatcap from "../assets/Crossclimate/Matcap/Tire_Matcap.png";
import crossclimateSideMatA0 from "../assets/Crossclimate/High/Texture/Tire_Side_Mat_AO.png";
import crossclimateSideMatNormal from "../assets/Crossclimate/High/Texture/Tire_Side_Mat_Normal.png";
import crossclimateRimMatA0 from "../assets/Crossclimate/High/Texture/Rim_Mat_AO.png";
import crossclimateRimMatNormal from "../assets/Crossclimate/High/Texture/Rim_Mat_Normal.png";
import rimMatcap from "../assets/Crossclimate/Matcap/Rim_Matcap.png";
import { interopImage } from "../helpers/interopImage";

//klasa z oponą matcap
export default function Tire(props) {
  const { nodes, materials } = useGLTF(crossclimateHigh);
  const [aoMap, normalMap, matCap] = useTexture([
    interopImage(crossclimatePatternMatA0),
    interopImage(crossclimatePatternMatNormal),
    interopImage(tireMatcap),
  ]);
  const [aoMap2, normalMap2] = useTexture([
    interopImage(crossclimateSideMatA0),
    interopImage(crossclimateSideMatNormal),
  ]);
  const [aoMapRim, normalMapRim, matCapRim] = useTexture([
    interopImage(crossclimateRimMatA0),
    interopImage(crossclimateRimMatNormal),
    interopImage(rimMatcap),
  ]);

  const mmm = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap: matCap,
        normalMap: normalMap,
        map: aoMap,
      })
  );

  aoMapRim.flipY = normalMapRim.flipY = matCapRim.flipY = false;
  aoMap2.flipY = normalMap2.flipY = false;
  aoMap.flipY = normalMap.flipY = matCap.flipY = false;

  const mmmSide = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap: matCap,
        normalMap: normalMap2,
        map: aoMap2,
      })
  );
  const mmmRim = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap: matCapRim,
        normalMap: normalMapRim,
        map: aoMapRim,
      })
  );

  return (
    <group {...props} dispose={null}>
      <group rotation={[0, 0, Math.PI / 2]} scale={0.01}>
        <mesh castShadow geometry={nodes.RIM_low.geometry} material={mmmRim} />
        <mesh castShadow material={mmm} geometry={nodes.Mesh.geometry}></mesh>

        <mesh castShadow geometry={nodes.Mesh_1.geometry} material={mmmSide} />
      </group>
    </group>
  );
}

useGLTF.preload(crossclimateHigh);
useTexture.preload([
  interopImage(crossclimatePatternMatA0),
  interopImage(crossclimatePatternMatNormal),
  interopImage(crossclimateSideMatA0),
  interopImage(crossclimateSideMatNormal),
  interopImage(tireMatcap),
]);

/*
const props = useTexture({
  map: 'PavingStones092_1K_Color.jpg',
  displacementMap: 'PavingStones092_1K_Displacement.jpg',
  normalMap: 'PavingStones092_1K_Normal.jpg',
  roughnessMap: 'PavingStones092_1K_Roughness.jpg',
  aoMap: 'PavingStones092_1K_AmbientOcclusion.jpg',
})

return (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial {...props} />
  </mesh>
)

*/
