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

      roll: () =>
        //rozpędzanie opony
        {
          set((state) => {
            return { phase: "rolling" };
          });
        },

      setLevelCompleted: () => {
        set((state) => {
          //console.log("LEVEL COMPLETED level +1");

          if (state.level >= 3) {
            //console.log("LEVEL >= 3")
            return { phase: "gameWin", level: state.level + 1 };
          } else {
            //console.log("LEVEL <3")
            return { phase: "levelCompleted", level: state.level + 1 };
          }
        });
      },

      setLevelFailed: () => {
        set((state) => {
          //console.log("LEVEL FAILED");
          state.level = 1;

          return { phase: "levelFailed" };
        });
      },

      setGameOver: () => {
        set((state) => {
          //console.log("GAME ENDED");
          return { phase: "ended" };
        });
      },

      startGrip: () => {
        //console.log("grip");
        set((state) => {
          return { phase: "grip" };
        });
      },

      setReadyToGrip: () => {
        //console.log("ready to grip");
        set((state) => {
          return { phase: "readyToGrip" };
        });
      },

      stopGrip: () => {
        //console.log("grip stopped");
        set((state) => {
          return { phase: "gripStopped" };
        });
      },

      restart: () => {
        //console.log("restart");
        set((state) => {
          return { phase: "ready" };
        });
      },

      setTireChallengeDone: () => {
        set((state) => {
          //console.log("challenge done in useGame");
          return { phase: "challengeDone" };
        });
      },
    };
  })
);
