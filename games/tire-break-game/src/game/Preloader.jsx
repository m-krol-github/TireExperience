import { Html, useProgress } from "@react-three/drei";
import useGame from "./stores/useGame";

// every game loader
export function Preloader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  console.log(item, loaded, total);

  const setGameLoaded = useGame((state) => state.setGameLoaded);

  if (progress === 100) {
    setTimeout(setGameLoaded, 2000); //console.log("interface setting game loaded !", progress);
  }

  return <Html center>{Math.round(progress)} % loaded</Html>;
}
