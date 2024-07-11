import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import useTime from "./stores/useTime";
import useGame from "./stores/useGame";

export default function FlowController() {
  const phase = useGame((state) => state.phase);
  const level = useGame((state) => state.level);

  function checkProgress() {
    //console.log("PROGRESS : ", progress);
  }

  return false;
}
