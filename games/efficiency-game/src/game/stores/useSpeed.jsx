import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

//kontrola prędkości i dystansu
export default create(
  subscribeWithSelector((set) => {
    return {
      speed: 0,
      distance: 0,
      targetDistance: [0, 0, 0],
      slotLength: 1,
      slotRespawnID: 0,

      resetDistance: () => {
        set((state) => {
          console.log("reseting distance", state.distance, state.slotRespawnID);
          return { distance: 0, slotRespawnID: 0 };
        });
      },

      setDistance: (val) => {
        set((state) => {
          // console.log("setDistance", state.distance);
          if (state.distance > state.slotLength * state.slotRespawnID) {
            // console.log("slotRespawnID", state.slotRespawnID);
            return { distance: 0, slotRespawnID: state.slotRespawnID + 1 };
          } else return { distance: state.distance + val };
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
