import { CameraControls } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls, button, folder } from "leva";

export default function CameraController(props) {
  const { targetVec, positionVec, controlsEnabled, min, max, dollyBase } =
    props;

  const cameraControlsRef = useRef();

  const viewport = useThree((state) => state.viewport);

  const { enabled, vec4, vec5 } = useControls(
    "cam controls",
    {
      vec4: {
        value: positionVec, //[0, 11, 20],
        label: "position",
        onChange: (v) => {
          cameraControlsRef.current?.setPosition(...v);
        },
      },
      vec5: {
        value: targetVec, //[0, 8, 0],
        label: "target",
        onChange: (v) => {
          cameraControlsRef.current?.setTarget(...v);
        },
      },
      enabled: { value: controlsEnabled, label: "controls on" },
    },
    { collapsed: true }
  );

  useEffect(() => {
    // Used to reset the camera position when the viewport changes
    const resetTimeout = setTimeout(() => {
      //let ratio = Math.min(0.8, Math.max(0.4, window.innerWidth / 1920));
      let ratio = Math.min(max, Math.max(min, window.innerWidth / 1920));
      console.log("RATIO : ", ratio);

      cameraControlsRef.current?.dollyTo(dollyBase / ratio, true);
    }, 200);
    return () => clearTimeout(resetTimeout);
  }, [viewport]);

  return (
    <>
      <Leva hidden />

      <CameraControls
        ref={cameraControlsRef}
        touches={{
          one: 0,
          two: 0,
          three: 0,
        }}
        mouseButtons={{
          left: 0,
          middle: 0,
          right: 0,
        }}
      />
    </>
  );
}
