import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

//kontrola prędkości i dystansu
export default create(
  subscribeWithSelector((set) => {
    return {
      speed: 0,
      distance: 0, //dystans // distance
      time: 0, //czas gry // game time (does't not confirmed)
      cornerScore: 0, //czyli 0-100% w ramach danego zakretu // 0 - 100% range of corner
      cornerStartDistance: 0, //miejsce od którego zaczyna się zakręt // distance where corner starts

      setCornerScore: (val) => {
        set((state) => {
          return { gripProgress: Math.floor(val * 100) };
        });
      },

      reset: () => {
        //todo dobry reset
        set((state) => {
          return {
            speed: 0,
            distance: 0,
            time: 0,
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
    };
  })
);
