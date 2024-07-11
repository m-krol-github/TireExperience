import {
  Html,
  useProgress,
  useTexture,
  Text3D,
  useFont,
  Center,
} from "@react-three/drei";
import useGame from "./stores/useGame";

import michelinBlackFont from "../assets/font/MichelinBlackReverse.json";

// every game loader
export function Preloader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  console.log(item, loaded, total);

  //const f = useFont(michelinBlackFont);
  const setGameLoaded = useGame((state) => state.setGameLoaded);

  if (progress === 100) {
    setGameLoaded();
  }

  return (
    <Center>
      <Text3D font={michelinBlackFont} position={[0, 0, 0]}>
        {Math.round(progress)}
      </Text3D>
    </Center>
  );
  //return <Html center>test</Html> <Html center>{Math.round(progress)} % loaded, {item}</Html>;
}

//useTexture.preload([gateOk, gateOff, gateWrong]);
