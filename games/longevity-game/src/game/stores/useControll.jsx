import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

//sterowanie zachowaniem opony
export default create(
  subscribeWithSelector((set) => {
    return {
      position: -1,
      ready: true,
      // ready - gra gotowa do rozpoczęcia na sam start

      gotoPosition: (val) => {
        set((state) => {
          console.log("setting position ", val);
          if (state.ready === true && val != state.position) {
            state.ready = false;
            return { position: val };
          } else return { position: state.position };
        });
      },

      setReady: (val) => {
        set((state) => {
          console.log("setting ready ", val);
          return { ready: val };
        });
      },
    };
  })
);
