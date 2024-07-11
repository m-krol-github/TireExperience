import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

//kontrola prędkości i dystansu
export default create(
  subscribeWithSelector((set) => {
    return {
      speed: 0,
      distance: 0,
      time: 0,
      temperature: 0,
      timer: 0,
      targetDistance: [0, 0, 0],
      gripProgress: 0, //czyli 0-100% w ramach danego levelu jak jest przyczepne
      gripStartDistance: 0, //dystans od którego zaczyna się przyczepność
      ghostAcceleration: 0, //przyspieszenie, zwolnienie ghosta

      setGripProgress: (val) => {
        set((state) => {
          return { gripProgress: Math.floor(val * 100) };
        });
      },

      setGhostAcceleration: (val) => {
        set((state) => {
          //console.log("acc 2 ", val)
          return { ghostAcceleration: val };
        });
      },

      setGripStartDistance: (val) => {
        set((state) => {
          return { gripStartDistance: state.distance };
        });
      },

      setDistance: (val) => {
        set((state) => {
          //console.log(val);
          return { distance: state.distance + val };
        });
      },

      reset: () => {
        //todo dobry reset
        set((state) => {
          return {
            speed: 0,
            distance: 0,
            time: 0,
            temperature: 0,
            timer: 3,
            targetDistance: [0, 0, 0],
          };
        });
      },

      setSpeed: (val) => {
        set((state) => {
          return { speed: val };
        });
      },

      setTime: (val) => {
        set((state) => {
          return { time: val };
        });
      },

      setTemperature: (val) => {
        set((state) => {
          return { temperature: val };
        });
      },

      setTimer: (val) => {
        set((state) => {
          return { timer: val };
        });
      },
    };
  })
);
