import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      phase: "ended", // jaka faza gry
      // start - gra gotowa do rozpoczęcia na sam start // ready to roll after LOAD game, fail STAGE, fail GAME
      // setLevelCompleted - poziom ukończony rozpędzanie //  one of stages done
      // setLevelFailed - poziom nie ukończony gotowy do testu przyczpności // stage failed due to SKIP or BRAKE grip rollback to start
      // grip - przyczepność // one of stages in progress
      // nocontrol - brak reaksji user'a
      // ended - gra zakończona

      level: 1, // poziom gry
      stage: 1, // etap gry

      readyToStart: () => {
        set((state) => {
          return { phase: "ended" };
        });
      },

      roll: () =>
        //rozpędzanie opony
        {
          set((state) => {
            return { phase: "rolling" };
          });
        },

      setLevelFailed: () => {
        set((state) => {
          //console.log("LEVEL FAILED");
          state.level = 1;

          return { phase: "levelFailed" };
        });
      },

      setTurnLeft: () => {
        set((state) => {
          //console.log("TURN LEFT");
          return { phase: "turnLeft" };
        });
      },

      setTurnRight: () => {
        set((state) => {
          //console.log("TURN RIGHT");
          return { phase: "turnRight" };
        });
      },

      setGameOver: () => {
        set((state) => {
          //console.log("GAME ENDED");
          return { phase: "ended" };
        });
      },

      restart: () => {
        //console.log("restart");
        set((state) => {
          return { phase: "ready" };
        });
      },

      setGameComplete: () => {
        set((state) => {
          //console.log("challenge done in useGame");
          return { phase: "gameDone" };
        });
      },
    };
  })
);
