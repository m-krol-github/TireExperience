import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      phase: "ready", // jaka faza gry
      // ready - gra gotowa do rozpoczęcia levelu
      // speedingUp - rozpędzanie
      // readyToBrake - gotowy do hamowania
      // braking - hamowanie
      // nobraking - nie zahamowano
      // levelCompleted - poziom ukończony
      // levelFailed - poziom nie ukończony
      // ended - gra zakończona

      level: 1, // poziom gry
      isPreloading: true,

      setGameLoaded: () =>
        //gra załadowana
        {
          set((state) => {
            return { isPreloading: false };
          });
        },

      showLevelIntro: () =>
        //rozpędzanie opony
        {
          set((state) => {
            return { phase: "ready" };
          });
        },

      start: () =>
        //rozpędzanie opony
        {
          set((state) => {
            state.whellsCount = 15;
            return { phase: "speedingUp" };
          });
        },

      setLevelCompleted: () => {
        set((state) => {
          console.log("LEVEL COMPLETED");
          state.level = state.level + 1;

          return { phase: "levelCompleted" };
        });
      },

      setLevelFailed: () => {
        set((state) => {
          console.log("LEVEL FAILED");
          state.level = 1;

          return { phase: "levelFailed" };
        });
      },

      end: () => {
        set((state) => {
          console.log("LEVEL ENDED");
          state.whellsCount = 0;
          state.whellClick = 0;
          return { phase: "ended" };
        });
      },

      restart: () => {
        console.log("restart");
        set((state) => {
          state.whellClick = 0;
          return { phase: "ready" };
        });
      },

      setReadyToBrake: () => {
        console.log("setReadyToBrake");
        set((state) => {
          return { phase: "readyToBrake" };
        });
      },

      startBraking: () => {
        console.log("startBraking");
        set((state) => {
          return { phase: "braking" };
        });
      },

      stopBraking: () => {
        console.log("STOP BRAKING");

        set((state) => {
          return { phase: "nobraking" };
        });
      },

      setNoInteraction: () => {
        console.log("NO ITERACTION TODO");

        set((state) => {
          return { phase: "nointeraction" };
        });
      },
    };
  })
);
