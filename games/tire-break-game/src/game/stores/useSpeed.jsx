import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

//kontrola prędkości i dystansu
export default create(
  subscribeWithSelector((set) => {
    return {
      speed: 0,
      distance: 0,
      targetDistance: [0, 0, 0],

      resetDistance: () => {
        set((state) => {
          return { distance: 0 };
        });
      },

      setDistance: (val) => {
        set((state) => {
          return { distance: state.distance + val };
        });
      },

      confirmTargetDistance: (level) => {
        set((state) => {
          console.log("confirmFinalDistance", level, state.distance);
          let newTD = [...state.targetDistance];
          newTD[level] = state.distance;
          return { targetDistance: newTD };
        });
      },

      setSpeed: (val) => {
        set((state) => {
          return { speed: val };
        });
      },
    };
  })
);
