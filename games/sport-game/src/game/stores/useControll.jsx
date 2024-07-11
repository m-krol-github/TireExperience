import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      turn: 0,
      turnMax: 15,
      
      setTurn: (value) => {
        set((state) => {
          let turn = state.turn + value;
          if (Math.abs(turn) >= state.turnMax) turn = state.turn;

          return { turn: turn };
        });
      },
    };
  })
);
