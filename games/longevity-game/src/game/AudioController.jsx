import { useEffect, useRef, useState, useMemo } from "react";
import useSpeed from "./stores/useSpeed";
import useGame from "./stores/useGame";
import { useGlobalAudioPlayer, useAudioPlayer } from "react-use-audio-player";

import back from "../assets/audio/back.mp3";
import correct from "../assets/audio/correct.wav";
import star from "../assets/audio/star.wav";

export function AudioController(props) {
  const backAP = useAudioPlayer();
  const starAP = useAudioPlayer();
  const correctAP = useAudioPlayer();

  const phase = useGame((state) => state.phase);

  // ... later in a callback, effect, etc.

  useEffect(() => {
    if (phase == "play") {
      console.log("Audio play");
      //  backAP.play();
    }
  }, [phase]);

  useEffect(() => {
    backAP.load(back, {
      autoplay: true,
      loop: true,
    });

    correctAP.load(correct, {
      autoplay: false,
    });

    starAP.load(star, {
      autoplay: false,
    });

    console.log("Audio loaded");

    const unsubsribeAnswer = useGame.subscribe(
      (state) => state.answerToShow,
      (value) => {
        correctAP.play();

        console.log("Audio answer " + value);
      }
    );

    const unsubsribeStar = useGame.subscribe(
      (state) => state.stars,
      (value) => {
        starAP.play();

        console.log("Audio answer " + value);
      }
    );

    return () => {
      unsubsribeAnswer();
      unsubsribeStar();
    };
  }, []);

  return <></>;
}
