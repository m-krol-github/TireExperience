import React, { useRef, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

import TrackLights from "../../assets/terrain/SportTrackLights.glb";
import StreetLightBase from "../../assets/textures/street_light/Street_Light_Mat_BaseColor_sRGB.jpg";
import StreetLightRough from "../../assets/textures/street_light/Street_Light_Mat_Roughness_Raw.jpg";
import StreetLightMetal from "../../assets/textures/street_light/Street_Light_Mat_Metallic_Raw.jpg";

import { MeshStandardMaterial } from "three";
import { interopImage } from "../../helpers/interopImage";

export default function SportTrackLights(props) {
  const { nodes } = useGLTF(TrackLights);

  const [StreetLightBaseMap, StreetLightRoughMap, StreetLightMetalMap] =
    useTexture([
      interopImage(StreetLightBase),
      interopImage(StreetLightRough),
      interopImage(StreetLightMetal),
    ]);

  StreetLightBaseMap.flipY = false;

  const mStreetLight = useMemo(
    () =>
      new MeshStandardMaterial({
        map: StreetLightBaseMap,
        roughnessMap: StreetLightRoughMap,
        metalnessMap: StreetLightMetalMap,
        toneMapped: false,
      })
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.pasted__Bottom_Column.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column.geometry}
        material={mStreetLight}
      />
      <mesh geometry={nodes.pasted__Front.geometry} material={mStreetLight} />
      <mesh
        geometry={nodes.pasted__Lamp_Base.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column001.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column001.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front001.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base001.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass001.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column002.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column002.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front002.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base002.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass002.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column003.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column003.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front003.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base003.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column004.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column004.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front004.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base004.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass004.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column005.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column005.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front005.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base005.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass005.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column006.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column006.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front006.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base006.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass006.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column007.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column007.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front007.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base007.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass007.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column008.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column008.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front008.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base008.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass008.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column009.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column009.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front009.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base009.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass009.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Bottom_Column010.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Top_Column010.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Front010.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Lamp_Base010.geometry}
        material={mStreetLight}
      />
      <mesh
        geometry={nodes.pasted__Plexiglass010.geometry}
        material={mStreetLight}
      />
    </group>
  );
}

useGLTF.preload(TrackLights);
useTexture.preload([StreetLightBase, StreetLightRough, StreetLightMetal]);
